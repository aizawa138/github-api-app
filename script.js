const searchInput = document.querySelector(".search-input");
const resultBox = document.querySelector(".result-box");
const errorMessage = document.querySelector(".error-message");

async function searchUser() {
    if (searchInput.value.trim() !== "") {
        try {
            const username = searchInput.value;
            const response = await fetch(`https://api.github.com/users/${username}`);

            if (!response.ok) {
                throw new Error("User not found");
            }

            const data = response.json();
            console.log(data);

        }
        catch (error) {
            resultBox.style.display = "block";
            errorMessage.textContent = error;
            errorMessage.style.display = "block";
        }
    }
    else {
        resultBox.style.display = "block";
        errorMessage.textContent = "Please enter a valid username";
        errorMessage.style.display = "block";
    }
}
