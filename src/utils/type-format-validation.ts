export const checkIfIsOdd = (number:number) => {
    return number%2 != 0
}


export const checkIfIsPrime = (n:number) => { 
    if (n <= 1) 
        return false; 
    for (let i = 2; i < n; i++) 
        if (n % i == 0) 
            return false; 
    return true; 
} 