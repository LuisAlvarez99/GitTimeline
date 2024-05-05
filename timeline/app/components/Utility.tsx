async function getTokenFunc() {
    const csrfToken = await fetch("http://localhost:3000/api/auth/csrf")
    
    if(!csrfToken.ok) {
        throw new Error('Failed to fetch data')
    }
    
    return csrfToken.json()
}