from flask import Flask, render_template, request
import util

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():
    bedroom = int(request.form["bedroom"])
    bathroom = int(request.form["bathroom"])
    toilet = int(request.form["toilet"])
    year_added = int(request.form["year_added"])
    community = "comm_" + request.form["community"]
    town = "town_" + request.form["town"]
    eco_class = "eco_" + request.form["eco_class"]

    prediction_value = util.get_estimated_price(
        bedroom, bathroom, toilet, year_added, community, town, eco_class
    )

    prediction_text = f"The predicted rent cost for {bedroom} Bedroom Flat in {community} Community is {prediction_value}"

    return render_template("index.html", prediction=prediction_text)

if __name__ == "__main__":
    app.run(debug=True)
