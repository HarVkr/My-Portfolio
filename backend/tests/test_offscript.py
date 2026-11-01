"""Backend tests for OFF-SCRIPT endpoint."""
import os
import requests
import pytest

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://mind-without-genre--9d6g62yr.preview.emergentagent.com").rstrip("/")


@pytest.fixture
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


class TestOffScript:
    def test_offscript_returns_200(self, api):
        r = api.get(f"{BASE_URL}/api/offscript", timeout=20)
        assert r.status_code == 200, r.text

    def test_offscript_four_scenes_ordered(self, api):
        r = api.get(f"{BASE_URL}/api/offscript", timeout=20)
        data = r.json()
        assert "scenes" in data and isinstance(data["scenes"], list)
        scenes = data["scenes"]
        assert len(scenes) == 4, f"expected 4 scenes, got {len(scenes)}"
        keys = [s["key"] for s in scenes]
        assert keys == ["movies", "music", "editing", "acting"], keys
        orders = [s["order"] for s in scenes]
        assert orders == [1, 2, 3, 4]

    def test_music_scene_has_two_stills(self, api):
        r = api.get(f"{BASE_URL}/api/offscript", timeout=20)
        scenes = r.json()["scenes"]
        music = next(s for s in scenes if s["key"] == "music")
        assert "stills" in music and len(music["stills"]) == 2
        for still in music["stills"]:
            assert "src" in still and "alt" in still and "caption" in still

    def test_scene_fields_present(self, api):
        r = api.get(f"{BASE_URL}/api/offscript", timeout=20)
        for s in r.json()["scenes"]:
            for f in ("key", "order", "tag", "title", "text"):
                assert f in s, f"missing {f} in {s}"

    def test_no_mongo_id_in_response(self, api):
        r = api.get(f"{BASE_URL}/api/offscript", timeout=20)
        for s in r.json()["scenes"]:
            assert "_id" not in s

    def test_filmography_still_works(self, api):
        r = api.get(f"{BASE_URL}/api/filmography", timeout=20)
        assert r.status_code == 200
        assert "chapters" in r.json()
