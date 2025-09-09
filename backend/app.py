from flask import Flask, Response, request,jsonify
from flask_cors import CORS
import controllers.questionCodes as questions

app = Flask(__name__)
CORS(app)

@app.route("/q1/stream")
def route_q1():
    def event_stream():
        # delegate to your generator in controllers/questionCodes.py
        for chunk in questions.q1_stream():
            yield chunk
    return Response(event_stream(), mimetype="text/event-stream")

@app.route("/q2")
def route_q2():
    return jsonify({"output": questions.q2()})

@app.route("/q3")
def route_q3():
    return jsonify({"output": questions.q3()})

@app.route("/q4")
def route_q4():
    return jsonify({"output": questions.q4()})

@app.route("/q5")
def route_q5():
    return jsonify({"output": questions.q5()})

@app.route("/q6")
def route_q6():
    return jsonify({"output": questions.q6()})

@app.route("/q7")
def route_q7():
    num = request.args.get("num", default=100, type=int)
    return jsonify({"output": questions.q7(num)})


if __name__ == "__main__":
    app.run(debug=True, port=8000)
