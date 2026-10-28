"""contract-ready 스키마를 예시에 대해 검증한다.
사용: python3 validate.py   (이 폴더에서. 공통 정의 _common.schema.json은 이웃 boundary-contracts/schemas에서 읽는다(읽기 전용).
이웃 위치는 환경 변수 BOUNDARY_CONTRACTS_SCHEMAS로 줄 수 있고, 없으면 리포 옆과 worktree 위치를 찾는다.)
examples/valid/<이름>[.변형].json은 통과, examples/invalid/<이름>[.변형].json은 거부되어야 하고, 형식마다 둘 다 1개 이상 있어야 한다.
MANIFEST.json의 항목과 schemas/ 파일이 일치하는지도 확인한다. 하나라도 어긋나면 FAIL을 내고 종료 코드 1이다."""
import json, os, sys, pathlib
from jsonschema import Draft202012Validator, RefResolver

here = pathlib.Path(__file__).resolve().parent
cands = [os.environ.get("BOUNDARY_CONTRACTS_SCHEMAS")] + [str(here.parents[p] / "boundary-contracts" / "schemas") for p in (3, 6, 5) if len(here.parents) > p]
common_dir = next((pathlib.Path(c) for c in cands if c and (pathlib.Path(c) / "_common.schema.json").exists()), None)
if common_dir is None:
    print("FAIL: _common.schema.json을 찾지 못했다. BOUNDARY_CONTRACTS_SCHEMAS에 boundary-contracts/schemas 경로를 주라", file=sys.stderr); sys.exit(2)
store = {"_common.schema.json": json.loads((common_dir / "_common.schema.json").read_text())}
schemas = {p.name.removesuffix(".schema.json"): json.loads(p.read_text()) for p in sorted((here / "schemas").glob("*.schema.json"))}
store.update({f"{n}.schema.json": s for n, s in schemas.items()})

passed = rejected = bad = 0
def check(name, cond, msg):
    global bad
    if not cond:
        bad += 1; print(f"FAIL {name}: {msg}")

manifest = json.loads((here / "MANIFEST.json").read_text())
check("MANIFEST", sorted(e["name"] for e in manifest["entries"]) == sorted(schemas), f"항목 {sorted(e['name'] for e in manifest['entries'])} != 스키마 {sorted(schemas)}")
for e in manifest["entries"]:
    check(e["name"], set(e) >= {"name", "source_draft", "producer", "consumers", "unknown_keys", "note"}, "MANIFEST 필드 부족")

for name, schema in schemas.items():
    Draft202012Validator.check_schema(schema)
    check(name, schema.get("$id") == f"{name}.schema.json" and schema.get("title") == name, "$id/title이 계약 이름과 다르다")
    v = Draft202012Validator(schema, resolver=RefResolver(base_uri="", referrer=schema, store=store))
    for kind, want in (("valid", True), ("invalid", False)):
        files = sorted((here / "examples" / kind).glob(f"{name}.json")) + sorted((here / "examples" / kind).glob(f"{name}.*.json"))
        check(name, files, f"{kind} 예시가 없다")
        for f in files:
            errs = [e.message[:70] for e in v.iter_errors(json.loads(f.read_text()))]
            ok = (not errs) == want
            if ok: passed += want; rejected += (not want)
            bad += not ok
            print(f"{'OK  ' if ok else 'FAIL'} {f.parent.name}/{f.name}: {'통과' if not errs else '거부 - ' + errs[0]}")
stray = [f.name for k in ("valid", "invalid") for f in (here / "examples" / k).glob("*.json") if f.name.split(".")[0] not in schemas]
check("examples", not stray, f"스키마가 없는 예시 {stray}")
print(f"통과 {passed}건, 거부 {rejected}건, 어긋남 {bad}건 (공통 정의: {common_dir})")
sys.exit(1 if bad else 0)
