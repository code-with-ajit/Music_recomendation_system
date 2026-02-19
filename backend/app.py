from flask import Flask, request, jsonify
from flask_cors import CORS
from model import recommend, search_songs
from dotenv import load_dotenv
import os
import requests

# ==============================
# Load Environment Variables
# ==============================
load_dotenv()

app = Flask(__name__)
CORS(app)

YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")

if YOUTUBE_API_KEY:
    print("YouTube API Key Loaded ✅")
else:
    print("WARNING: YouTube API Key Missing ❌")


# ==============================
# 🔥 YouTube Search Function
# ==============================
def get_youtube_video(song_name, artist_name):
    if not YOUTUBE_API_KEY:
        return None

    # Better search query (important for your dataset)
    search_query = f"{song_name} {artist_name} official audio"

    url = "https://www.googleapis.com/youtube/v3/search"

    params = {
        "part": "snippet",
        "q": search_query,
        "key": YOUTUBE_API_KEY,
        "type": "video",
        "maxResults": 1
    }

    try:
        response = requests.get(url, params=params)
        data = response.json()

        if "items" in data and len(data["items"]) > 0:
            return data["items"][0]["id"]["videoId"]

    except Exception as e:
        print("YouTube API Error:", e)

    return None


# ==============================
# Routes
# ==============================

@app.route("/")
def home():
    return "AI Music Backend Running 🚀"


@app.route("/recommend", methods=["POST"])
def get_recommendations():
    data = request.get_json()
    song = data.get("song")

    if not song:
        return jsonify({
            "matched_song": None,
            "recommendations": []
        })

    result = recommend(song)

    # ==============================
    # 🔥 Add YouTube video to MATCHED SONG
    # ==============================
    matched = result.get("matched_song")

    if matched:
        matched["youtube_video_id"] = get_youtube_video(
            matched.get("title", ""),
            matched.get("artist", "")
        )

    # ==============================
    # 🔥 Add YouTube video to RECOMMENDATIONS
    # ==============================
    for rec in result.get("recommendations", []):
        rec["youtube_video_id"] = get_youtube_video(
            rec.get("title", ""),
            rec.get("artist", "")
        )

    return jsonify(result)


@app.route("/search", methods=["POST"])
def search():
    data = request.get_json()
    query = data.get("query")

    results = search_songs(query)
    return jsonify({"suggestions": results})
