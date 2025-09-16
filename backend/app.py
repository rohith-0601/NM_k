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
    p1 = request.args.get("start", default=2203, type=int)
    p2 = request.args.get("end", default=2281, type=int)
    count = request.args.get("count", default=None, type=int)  # optional count limit
    
    # Pass None if count is 0 or negative to disable count limit
    count = count if count and count > 0 else None
    
    try:
        result = questions.q4(p1, p2, max_count=count)
        return jsonify({"output": result})
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

# ================= Q5 =================
@app.route("/q5")
def route_q5():
    min_digits = int(request.args.get("min_digits", 50))
    max_primes = int(request.args.get("max_primes", 2))
    return jsonify({"output": questions.q5(min_digits, max_primes)})


# ================= Q6 =================
@app.route("/q6")
def route_q6():
    p = request.args.get("p", default=2, type=int)
    return jsonify(questions.euclid_euler_perfect(p))


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
