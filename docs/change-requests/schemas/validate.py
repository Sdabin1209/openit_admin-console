"""초안 스키마를 예시에 대해 검증한다. 사용: python3 validate.py (이 폴더에서). *.valid.json은 통과, *.invalid.json은 거부되어야 한다."""
import json, sys, pathlib
from jsonschema import Draft202012Validator
here = pathlib.Path(__file__).parent
bad = 0
for sp in sorted(here.glob("*.schema.json")):
    name = sp.name.removesuffix(".schema.json")
    schema = json.loads(sp.read_text())
    Draft202012Validator.check_schema(schema)
    v = Draft202012Validator(schema)
    for kind, want in (("valid", True), ("invalid", False)):
        errs = [e.message[:70] for e in v.iter_errors(json.loads((here / "examples" / f"{name}.{kind}.json").read_text()))]
        ok = (not errs) == want
        bad += not ok
        print(f"{'OK  ' if ok else 'FAIL'} {name}.{kind}: {'통과' if not errs else '거부 - ' + errs[0]}")
sys.exit(1 if bad else 0)
