function AuthButton() {
    return (
        <div className="bg-black text-white absolute top-4 right-4 rounded-md shadow-md">
            <a href="/auth" >
                <button className="px-10 py-2">Auth</button>
            </a>
        </div>
    );
}

export default AuthButton;