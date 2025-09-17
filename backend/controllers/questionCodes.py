import sys
import gmpy2
import time
import sympy
from sympy import isprime
from gmpy2 import mpz, is_prime
import json

# Allow huge integers in Python
if hasattr(sys, 'set_int_max_str_digits'):
    sys.set_int_max_str_digits(10_000_000)


# ================= Q1 =================
def build_kaprekar(num_limit: int) -> int:
    num = 0
    for i in range(1, num_limit + 1):
        num = num * (10 ** len(str(i))) + i
    for i in range(num_limit - 1, 0, -1):
        num = num * (10 ** len(str(i))) + i
    return num

# --- SSE Stream ---
def stream_q1(start, end):
    start_time = time.time()
    last_kap = 0

    for num_limit in range(start, end + 1):
        kap_number = build_kaprekar(num_limit)
        last_kap = kap_number
        elapsed_time = round(time.time() - start_time, 2)

        # Check if prime first
        if gmpy2.is_prime(kap_number):
            yield f"data: {json.dumps({'found': True, 'n': num_limit, 'kaprekar_number': str(kap_number), 'elapsed_time': elapsed_time})}\n\n"
            return
        else:
            # Send current checking number only if not prime
            yield f"data: {json.dumps({'current_check': num_limit, 'kaprekar_number': str(kap_number), 'elapsed_time': elapsed_time})}\n\n"

    # If no prime found
    yield f"data: {json.dumps({'not_found': True, 'last_checked': str(last_kap), 'elapsed_time': elapsed_time})}\n\n"

        
# ================= Q2 =================
def q2(start: int, end: int, max_primes=5):
    """
    Find repunit primes 1N where N is prime, for N in [start, end].
    """
    result = []
    prime_count = 0

    for N in range(start, end + 1):
        if not isprime(N):
            continue
        repunit = (10**N - 1) // 9
        if isprime(repunit):
            result.append({"N": N, "repunit": str(repunit)})
            prime_count += 1
            if prime_count >= max_primes:
                break
    return result


# ================= Q3 =================
def q3(start: int, end: int):
    """Find Mersenne primes in given exponent range."""
    result = []
    for i in range(start, end + 1):
        n = 2**i - 1
        if isprime(n):
            result.append({"i": i, "mersenne": str(n)})
    return result


# ================= Q4 =================
P1_DEFAULT = int("1475979915214180235084898622737381736312066145333169775147771216478570297878078949377407337049389289382748507531496480477281264838760259191814463365330269540496961201113430156902396093989090226259326935025281409614983499388222831448598601834318536230923772641390209490231836446899608210795482963763094236630945410832793769905399982457186322944729636418890623372171723742105636440368218459649632948538696905872650486914434637457507280441823676813517852099348660847172579408422316678097670224011990280170474894487426924742108823536808485072502240519452587542875349976558572670229633962575212637477897785501552646522609988869914013540483809865681250419497686697771007")

P2_DEFAULT = int("446087557183758429571151706402101809886208632412859901111991219963404685792820473369112545269003989026153245931124316702395758705693679364790903497461147071065254193353938124978226307947312410798874869040070279328428810311754844108094878252494866760969586998128982645877596028979171536962503068429617331702184750324583009171832104916050157628886606372145501702225925125224076829605427173573964812995250569412480720738476855293681666712844831190877620606786663862190240118570736831901886479225810414714078935386562497968178729127629594924411960961386713946279899275006954917139758796061223803393537381034666494402951052059047968693255388647930440925104186817009640171764133172418132836351")

def q4(p1: int = P1_DEFAULT, p2: int = P2_DEFAULT, max_count: int = None):
    """
    Given two primes p1 and p2 (default: very large Mersenne primes from exponents 2203 and 2281),
    find all primes between p1^2 and p2^2.
    If max_count is provided, return up to that many primes.
    """
    # Check inputs
    if not (isprime(p1) and isprime(p2)):
        raise ValueError("Both inputs must be prime numbers.")
    if p1 >= p2:
        raise ValueError("p1 must be less than p2.")
    
    # Compute square ranges
    start_sq = gmpy2.mpz(p1) ** 2
    end_sq = gmpy2.mpz(p2) ** 2
    
    primes_found = []
    current = gmpy2.next_prime(start_sq)
    
    while current < end_sq:
        primes_found.append(str(current))  # ✅ store as string
        if max_count and len(primes_found) >= max_count:
            break
        current = gmpy2.next_prime(current)
    
    message = f"Found {len(primes_found)} primes between {start_sq} and {end_sq}."
    
    return {
        "p1": str(p1),
        "p2": str(p2),
        "primes_between_squares": primes_found,  # ✅ all safe strings
        "message": message
    }





# ================= Q5 =================
import time
from gmpy2 import mpz, is_prime

def generate_palindrome(length):
    """
    Generate all palindromes of a given length.
    """
    half = (length + 1) // 2
    start = 10 ** (half - 1)
    end = 10 ** half
    for i in range(start, end):
        s = str(i)
        pal = s + s[-2::-1]  # construct palindrome
        yield mpz(pal)

def q5(min_digits=50, max_primes=2):
    """
    Find palindromic primes starting from min_digits.
    Automatically increases length if no prime found.
    """
    start_time = time.time()
    length = min_digits if min_digits % 2 == 1 else min_digits + 1
    found_primes = 0
    results = []

    while found_primes < max_primes:
        found_in_this_length = False
        for pal in generate_palindrome(length):
            if is_prime(pal):
                elapsed = round(time.time() - start_time, 2)
                results.append({
                    "palindromic_prime": str(pal),
                    "digits": len(str(pal)),
                    "runtime_seconds": elapsed
                })
                found_primes += 1
                found_in_this_length = True
                if found_primes >= max_primes:
                    break

        if not found_in_this_length:
            # no primes found in this length, move to next odd length
            length += 2
        else:
            # move to next length anyway to find remaining primes
            length += 2

    return results


# ================= Q6 =================
def euclid_euler_perfect(p: int):
    """Generate the perfect number for exponent p if 2^p - 1 is prime."""
    mersenne = (1 << p) - 1  # 2^p - 1
    if not isprime(mersenne):
        return {"p": p, "is_mersenne_prime": False}

    perfect = (1 << (p - 1)) * mersenne
    return {
        "p": p,
        "is_mersenne_prime": True,
        "digits": len(str(perfect)),
        "perfect_number": str(perfect)  # ⚠️ huge string, careful
    }

# ================= Q7 =================
def sum_of_two_primes(n):
    """
    Check if n can be expressed as sum of two primes.
    For odd n, only possible if one prime is 2.
    """
    if n < 4:
        return False, None

    if n % 2 == 0:  # Even number (Goldbach conjecture)
        for i in range(2, n // 2 + 1):
            if sympy.isprime(i) and sympy.isprime(n - i):
                return True, [i, n - i]
    else:  # Odd number, one prime must be 2
        if sympy.isprime(2) and sympy.isprime(n - 2):
            return True, [2, n - 2]

    return False, None