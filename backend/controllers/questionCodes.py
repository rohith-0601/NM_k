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
def q4(start: int = 2203, end: int = 2281, count: int = 4):
    """
    Find 'count' primes greater than (2^start - 1)^2 until below (2^end - 1)^2.
    Default: uses Q3 known exponents (2203, 2281).
    """
    num1 = (2**start - 1)**2
    num2 = (2**end - 1)**2
    result = []
    prime_count = 0
    n = num1

    while prime_count < count and n < num2:
        n = sympy.nextprime(n)
        result.append({"prime": str(n)})
        prime_count += 1

    result.append({"message": f"At least {count} primes exist between given numbers"})
    return result



# ================= Q5 =================
from gmpy2 import mpz, is_prime

def generate_palindrome(min_digits, max_primes):
    result = []
    prime_count = 0
    length = min_digits  # <-- start exactly from given min_digits

    while prime_count < max_primes:
        half_len = (length + 1) // 2
        start = 10**(half_len - 1)
        end = 10**half_len

        for i in range(start, end):
            s = str(i)
            if length % 2 == 0:
                # even-length palindrome
                pal = s + s[::-1]
            else:
                # odd-length palindrome
                pal = s + s[-2::-1]

            if is_prime(mpz(pal)):
                result.append({"palindromic_num": str(pal), "digits": len(pal)})
                prime_count += 1
                if prime_count >= max_primes:
                    break

        length += 1  # ✅ move to next length (increment by 1, not +2)

    return result





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