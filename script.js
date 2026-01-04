const searchInput = document.querySelector(".search-input");
const resultBox = document.querySelector(".result-box");
const errorMessage = document.querySelector(".error-message");
const userInfo = document.querySelector(".user-info");

async function searchUser() {
    if (searchInput.value.trim() !== "") {
        try {
            errorMessage.style.display = "none";
            userInfo.innerHTML = "";
            resultBox.innerHTML = `
                <div class="user-info">
                </div>
                <p class="error-message"></p>
            `;

            const username = searchInput.value;
            const response = await fetch(`https://api.github.com/users/${username}`);

            if (!response.ok) {
                throw new Error("User not found");
            }

            const data = await response.json();
            console.log(data);

            const avatarUrl = document.createElement("img");
            avatarUrl.src = data.avatar_url;
            avatarUrl.alt = "avatar-url";
            avatarUrl.classList.add("avatar-url");

            const name = document.createElement("span");
            name.textContent = data.login;
            name.classList.add("name");

            
            userInfo.appendChild(avatarUrl);
            userInfo.appendChild(name);

            resultBox.appendChild(userInfo);

            if (data.company !== null) {
                const company = document.createElement("p");
                company.textContent = `Company: ${data.company}`;
                company.classList.add("company");
                resultBox.appendChild(company);
            }

            if (data.twitter_username !== null) {
                const twitterUsername = document.createElement("p");
                twitterUsername.textContent = `X: @${data.twitter_username}`;
                twitterUsername.classList.add("twitter-username");
                resultBox.appendChild(twitterUsername);
            }

            resultBox.style.display = "block";

        }
        catch (error) {
            resultBox.style.display = "block";
            errorMessage.textContent = error.message;
            errorMessage.style.display = "block";
        }
    }
    else {
        resultBox.style.display = "block";
        errorMessage.textContent = "Please enter a valid username";
        errorMessage.style.display = "block";
    }
}
