from flask import Flask, Response, request,jsonify
from flask_cors import CORS
import controllers.questionCodes as questions

app = Flask(__name__)
CORS(app)

@app.route("/q1/stream")
def route_q1():
    start = request.args.get("start", default=10, type=int)
    end = request.args.get("end", default=300, type=int)

    def event_stream():
        for chunk in questions.q1_stream(start, end):
            yield chunk

    return Response(event_stream(), mimetype="text/event-stream")

@app.route("/q2")
def route_q2():
    max_primes = request.args.get("max_primes", default=5, type=int)
    return jsonify({"output": questions.q2(max_primes)})

@app.route("/q3")
def route_q3():
    start = request.args.get("start", default=2201, type=int)
    end = request.args.get("end", default=2298, type=int)
    return jsonify({"output": questions.q3(start, end)})


@app.route("/q4")
def route_q4():
    return jsonify({"output": questions.q4()})

@app.route("/q5")
def route_q5():
    max_digits = int(request.args.get("max_digits", 50))
    max_primes = int(request.args.get("max_primes", 5))
    return jsonify({"output": questions.q5(max_digits, max_primes)})

@app.route("/q6")
def route_q6():
    primes_str = request.args.get("primes", "")  # e.g. "2203,2281"
    try:
        primes = [int(x.strip()) for x in primes_str.split(",") if x.strip()]
    except ValueError:
        return jsonify({"error": "Invalid primes input"}), 400

    return jsonify({"output": q6(primes)})

@app.route("/q7")
def route_q7():
    num = request.args.get("num", default=100, type=int)
    return jsonify({"output": questions.q7(num)})


if __name__ == "__main__":
    app.run(debug=True, port=8000)
