window.onload = async () => {
    const params = new URLSearchParams(window.location.search);
    const serverName = params.get('name');
    const serverIcon = params.get('icon');
    const guildId = params.get('guildId');

    if (!guildId) {
        alert("Guild ID is missing in the url parameters");
        return;
    }

    const userResponse = await fetch('/api/user-info');
    const userInfo = await userResponse.json();


    const { username, avatar, guilds } = userInfo;

    document.getElementById('navbar-username').innerText = username;
                        if (avatar) {
                            document.getElementById('navbar-avatar').src = avatar;
                        }

    document.getElementById('server-name').innerText = serverName;
    document.getElementById('server-icon').src = serverIcon;


    try {
        const response = await fetch(`/api/get-prefix?guildId=${guildId}`);
        const data = await response.json();
        const currentPrefix = data.prefix || ',';
        document.getElementById('prefix-input').value = currentPrefix;
    } catch (error) {
        console.error('Error fetching prefix', error);
    }

    document.getElementById('save-button').addEventListener('click', async () => {
        const newPrefix = document.getElementById('prefix-input').value;
        try {

        } catch (error) {
            const response = await fetch(`/api/set-prefix`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({ guildId, prefix: newPrefix }),

            });
            

            if (response.ok) {
                alert('Prefix Updated Successfully');
            } else {
                alert('Failed to update prefix');
            }

        } 

        try {

        }catch (error) {
            console.error('Error saving prefix', error);
        }
    })



    document.querySelectorAll('.sidebar ul li').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.sidebar ul li').forEach(li => li.classList.remove('active'));
            item.classList.add('active');

            const sectionId = item.getAttribute('data-section');
            document.querySelectorAll('.section').forEach(section => {
                document.querySelectorAll('.section').forEach(section => {
                    section.style.display = section.id === sectionId ? 'block' : 'none';
                });
            });
        });

        document.querySelector('.sidebar ul li').click();
    })
}