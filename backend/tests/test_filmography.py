"""Backend tests for THE FILMOGRAPHY section: /api/filmography + static assets."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://mind-without-genre--9d6g62yr.preview.emergentagent.com").rstrip("/")


@pytest.fixture(scope="module")
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


def test_filmography_endpoint_returns_three_ordered_chapters(api):
    r = api.get(f"{BASE_URL}/api/filmography", timeout=15)
    assert r.status_code == 200, r.text
    data = r.json()
    assert "chapters" in data
    chapters = data["chapters"]
    assert len(chapters) == 3, f"expected 3 chapters, got {len(chapters)}"
    # Ordered by order ascending
    orders = [c.get("order") for c in chapters]
    assert orders == [1, 2, 3], f"order wrong: {orders}"
    keys = [c.get("key") for c in chapters]
    assert keys == ["spit", "spjimr", "bakerhughes"], f"keys wrong: {keys}"
    # Required fields
    for c in chapters:
        for f in ("label", "title", "org", "role", "duration", "desc", "image", "logo", "detail"):
            assert f in c, f"chapter {c.get('key')} missing {f}"
        d = c["detail"]
        for f in ("overview", "meta", "metrics", "highlights"):
            assert f in d, f"chapter {c['key']} detail missing {f}"


def test_filmography_specific_metrics(api):
    r = api.get(f"{BASE_URL}/api/filmography", timeout=15)
    chapters = {c["key"]: c for c in r.json()["chapters"]}
    # SPJIMR 4 metrics 7+, 20+, 3, 5+
    sp = chapters["spjimr"]["detail"]
    assert len(sp["metrics"]) == 4
    assert [m["value"] for m in sp["metrics"]] == ["7+", "20+", "3", "5+"]
    assert len(sp["highlights"]) == 4
    # Baker Hughes 180+, 100+, ×2, 0
    bh = chapters["bakerhughes"]["detail"]
    assert [m["value"] for m in bh["metrics"]] == ["180+", "100+", "×2", "0"]
    assert len(bh["highlights"]) == 4
    # SPIT no metrics/highlights
    sp2 = chapters["spit"]["detail"]
    assert sp2["metrics"] == []
    assert sp2["highlights"] == []
    assert len(sp2["meta"]) == 3


@pytest.mark.parametrize("path", [
    "/filmography/chapter-spit.jpg",
    "/filmography/chapter-spjimr.jpg",
    "/filmography/chapter-bakerhughes.jpg",
    "/filmography/logos/spit.png",
    "/filmography/logos/spjimr.png",
    "/filmography/logos/baker-hughes.svg",
])
def test_static_assets_200(api, path):
    r = api.get(f"{BASE_URL}{path}", timeout=15)
    assert r.status_code == 200, f"{path} => {r.status_code}"
    assert int(r.headers.get("content-length", len(r.content))) > 100


def test_no_mongo_id_leak(api):
    r = api.get(f"{BASE_URL}/api/filmography", timeout=15)
    body = r.text
    assert '"_id"' not in body, "MongoDB _id leaked in response"


def test_regression_toolkit_endpoint(api):
    r = api.get(f"{BASE_URL}/api/toolkit", timeout=15)
    assert r.status_code == 200
    d = r.json()
    assert "sections" in d and "languages" in d
