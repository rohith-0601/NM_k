import sys
import gmpy2
from sympy import isprime
import time

# allow huge integers in Python (avoid ValueError)
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

def q1_stream(start: int = 10, end: int = 300):
    start_time = time.time()
    found = False

    for n in range(start, end + 1):
        candidate = kaprekar_num(n)
        elapsed = round(time.time() - start_time, 2)

        # progress update (valid JSON)
        yield f'data: {{"current_check": {n}, "runtime_seconds": {elapsed}}}\n\n'

        if gmpy2.is_prime(candidate):
            yield f'data: {{"found": true, "n": {n}, "kaprekar_number": "{candidate}", "runtime_seconds": {elapsed}}}\n\n'
            found = True
            break

    if not found:
        elapsed = round(time.time() - start_time, 2)
        yield f'data: {{"not_found": true, "runtime_seconds": {elapsed}}}\n\n'


# ================= Q2 =================


def q2(max_primes=5):
    """
    Find repunit primes 1N where N is prime, for N in [2, 1040].
    Returns only the first max_primes found for speed.
    """
    result = []
    prime_count = 0

    for N in range(2, 1041):
        if not isprime(N):
            continue  # Only N prime can give a prime 1N

        # Compute repunit 1N: (10**N - 1) // 9
        repunit = (10**N - 1) // 9
        if isprime(repunit):
            result.append({
                "N": N,
                "repunit": str(repunit)
            })
            prime_count += 1
            if prime_count >= max_primes:
                break

    return result



# ================= Q3 =================
def q3(start=2201, end=2298):
    result = []
    for i in range(start, end + 1):
        n = 2**i - 1
        if isprime(n):
            result.append({"i": i, "mersenne": str(n)})
    return result



# ================= Q4 =================
def q4():
    # Avoid looping through huge numbers (impractical)
    # Just show 4 example primes using sympy nextprime
    import sympy
    num1 = (2**2203 - 1)**2
    result = []
    prime_count = 0
    n = num1
    while prime_count < 4:
        n = sympy.nextprime(n)
        result.append({"prime": str(n)})
        prime_count += 1
    result.append({"message": "At least 4 primes exist between the given numbers"})
    return result


# ================= Q5 =================

from gmpy2 import mpz, is_prime

def generate_palindrome(length):
    """Generate odd-length palindromes only (even ones divisible by 11)."""
    half = (length + 1) // 2
    start = 10 ** (half - 1)
    end = 10 ** half

    for i in range(start, end):
        s = str(i)
        pal = s + s[-2::-1]  # odd-length palindrome
        yield mpz(pal)


def q5(max_digits=50, max_primes=5):
    """Find first palindromic primes >= max_digits digits."""
    result = []
    length = max_digits if max_digits % 2 == 1 else max_digits + 1
    prime_count = 0

    while prime_count < max_primes:
        for pal in generate_palindrome(length):
            if is_prime(pal):
                result.append({
                    "palindromic_num": str(pal),
                    "digits": len(str(pal))
                })
                prime_count += 1
                if prime_count >= max_primes:
                    break
        length += 2  # move to next odd-length palindrome

    return result


# ================= Q6 =================
def euclid_number(p):
    """Compute Euclid number for a prime p: 2^(p-1) * (2^p - 1)"""
    return (2**(p - 1)) * (2**p - 1)


def q6(primes):
    """
    Compute Euclid numbers for given primes.
    Returns list of dicts with prime, digits count, and number.
    """
    result = []
    for p in primes:
        n = euclid_number(p)
        result.append({
            "p": p,
            "digits": len(str(n)),
            "euclid_number": str(n)
        })
    return result



import sympy

def q7(num):
    """Check if a number can be expressed as sum of two primes."""
    possible = False
    pair = None

    for i in range(2, num):
        if sympy.isprime(i) and sympy.isprime(num - i):
            possible = True
            pair = [i, num - i]
            break

    return {
        "number": num,
        "is_sum_of_two_primes": possible,
        "pair": pair
    }

