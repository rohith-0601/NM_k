import sys
import gmpy2
import time
import sympy
from sympy import isprime
from gmpy2 import mpz, is_prime

# Allow huge integers in Python
if hasattr(sys, 'set_int_max_str_digits'):
    sys.set_int_max_str_digits(10_000_000)


# ================= Q1 =================
def kaprekar_num(n: int) -> int:
    num = 0
    for i in range(1, n + 1):
        num = num * (10 ** len(str(i))) + i
    for i in range(n - 1, 0, -1):
        num = num * (10 ** len(str(i))) + i
    return num


def q1(start: int, end: int):
    """Find the first prime Kaprekar-like number between given n range."""
    result = {"start": start, "end": end, "found": False}
    start_time = time.time()

    for n in range(start, end + 1):
        candidate = kaprekar_num(n)
        if gmpy2.is_prime(candidate):
            result.update({
                "found": True,
                "n": n,
                "kaprekar_number": str(candidate),
                "runtime_seconds": round(time.time() - start_time, 2)
            })
            return result

    result["runtime_seconds"] = round(time.time() - start_time, 2)
    return result


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
def q4(start: int, end: int, count=4):
    """
    Find 'count' primes greater than (2^start - 1)^2 until below (2^end - 1)^2.
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
def generate_palindrome(length):
    """Generate odd-length palindromes only (even ones divisible by 11)."""
    half = (length + 1) // 2
    start = 10 ** (half - 1)
    end = 10 ** half
    for i in range(start, end):
        s = str(i)
        pal = s + s[-2::-1]
        yield mpz(pal)


def q5(start_digits: int, end_digits: int, max_primes=5):
    """
    Find palindromic primes in digit length range [start_digits, end_digits].
    """
    result = []
    prime_count = 0
    length = start_digits if start_digits % 2 == 1 else start_digits + 1

    while prime_count < max_primes and length <= end_digits:
        for pal in generate_palindrome(length):
            if is_prime(pal):
                result.append({
                    "palindromic_num": str(pal),
                    "digits": len(str(pal))
                })
                prime_count += 1
                if prime_count >= max_primes:
                    break
        length += 2
    return result


# ================= Q6 =================
def euclid_number(p):
    return (2**(p - 1)) * (2**p - 1)


def q6(start: int, end: int):
    """
    Compute Euclid numbers for primes in [start, end].
    """
    result = []
    for p in range(start, end + 1):
        if isprime(p):
            n = euclid_number(p)
            result.append({
                "p": p,
                "digits": len(str(n)),
                "euclid_number": str(n)
            })
    return result


# ================= Q7 =================
def q7(start: int, end: int):
    """
    Check Goldbach representation for numbers in [start, end].
    """
    result = []
    for num in range(start, end + 1):
        possible = False
        pair = None
        for i in range(2, num):
            if sympy.isprime(i) and sympy.isprime(num - i):
                possible = True
                pair = [i, num - i]
                break
        result.append({
            "number": num,
            "is_sum_of_two_primes": possible,
            "pair": pair
        })
    return result
