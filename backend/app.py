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

print("YouTube Key Loaded:", os.getenv("YOUTUBE_API_KEY"))


# ==============================
# 🔥 YouTube Search Function
# ==============================
def get_youtube_video(song_name, artist_name):
    api_key = os.getenv("YOUTUBE_API_KEY")

    if not api_key:
        return None

    search_query = f"{song_name} {artist_name} official song"

    url = "https://www.googleapis.com/youtube/v3/search"

    params = {
        "part": "snippet",
        "q": search_query,
        "key": api_key,
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
    data = request.json
    song = data.get("song")

    if not song:
        return jsonify({
            "matched_song": None,
            "recommendations": ["No song provided"]
        })

    result = recommend(song)

    # 🔥 Add YouTube video for each recommendation
    if "recommendations" in result:
        for rec in result["recommendations"]:
            video_id = get_youtube_video(
                rec.get("track_name", ""),
                rec.get("artist", "")
            )
            rec["youtube_video_id"] = video_id

    return jsonify(result)


@app.route("/search", methods=["POST"])
def search():
    data = request.json
    query = data.get("query")

    results = search_songs(query)

    return jsonify({"suggestions": results})


# ==============================
# Run Server
# ==============================
if __name__ == "__main__":
    app.run(debug=True)
