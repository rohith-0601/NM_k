from flask import Flask, Response, request, jsonify
from flask_cors import CORS
import controllers.questionCodes as questions

app = Flask(__name__)
CORS(app)


# ================= Q1 =================

@app.route("/q1/stream")
def q1_stream():
    start = request.args.get("start", default=10, type=int)
    end = request.args.get("end", default=30, type=int)
    return Response(questions.stream_q1(start, end), mimetype="text/event-stream")


# ================= Q2 =================
@app.route("/q2")
def route_q2():
    start = request.args.get("start", default=2, type=int)
    end = request.args.get("end", default=1040, type=int)
    max_primes = request.args.get("max_primes", default=5, type=int)
    return jsonify({"output": questions.q2(start, end, max_primes)})


# ================= Q3 =================
@app.route("/q3")
def route_q3():
    start = request.args.get("start", default=2201, type=int)
    end = request.args.get("end", default=2298, type=int)
    return jsonify({"output": questions.q3(start, end)})


# ================= Q4 =================
@app.route("/q4")
def route_q4():
    start = request.args.get("start", default=2203, type=int)
    end = request.args.get("end", default=2281, type=int)
    count = request.args.get("count", default=4, type=int)
    return jsonify({"output": questions.q4(start, end, count)})


# ================= Q5 =================
@app.route("/q5")
def route_q5():
    min_digits = request.args.get("start_digits", default=20, type=int)
    max_primes = request.args.get("max_primes", default=5, type=int)
    return jsonify({"output": questions.generate_palindrome(min_digits, max_primes)})


# ================= Q6 =================
@app.route("/q6")
def route_q6():
    start = request.args.get("start", default=2, type=int)
    end = request.args.get("end", default=100, type=int)
    return jsonify({"output": questions.q6(start, end)})


# ================= Q7 =================
@app.route("/q7")
def route_q7():
    num = request.args.get("num")
    if not num:
        return jsonify({"error": "Missing number parameter"}), 400

    try:
        n = int(num)
    except ValueError:
        return jsonify({"error": "Invalid number"}), 400

    can_sum, pair = questions.sum_of_two_primes(n)
    return jsonify({
        "output": {
            "number": n,
            "is_sum_of_two_primes": can_sum,
            "pair": pair
        }
    })



if __name__ == "__main__":
    app.run(debug=True, port=8000)
