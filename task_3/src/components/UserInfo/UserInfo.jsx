import {useState, useEffect} from "react";
import './UserInfoStyle.css';

export const UserInfo = () => {

    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(json => setUsers(json));
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(json => setPosts(json));
    }, []);

    let arrusers = [], arrposts = [], card = [];

    for (let i = 0; i < posts.length; i++) {
        arrposts.push({userId: posts[i]["userId"], title: posts[i]["title"], body: posts[i]["body"]});
    };
    for (let i = 0; i < users.length; i++) {
        arrusers.push({id: users[i]["id"], key: i, names: users[i]["name"]});
        card.push(arrposts.filter((post) => post.userId == arrusers[i].id));
    };

    let content = [], check = [], handleClicker = [];

    for (let i = 0; i < users.length; i++) {
        setTimeout(() => {content.push(document.getElementById(i))}, 1000);
        check.push(false);

        handleClicker.push(() => {if (check[i] == false && content[i] != null) {
            content[i].style.display = 'block';
            check[i] = true;
        }
        else if (check[i] == true && content[i] != null) {
            content[i].style.display = 'none';
            check[i] = false;
        };});
    };

    return (
        <div>
            {arrusers.map(item => (
                <>
                    <div onClick={handleClicker[item.key]} class="button">{item.key + 1 + ') ' + item.names}</div>
                    <div class="content" id={item.key}>
                        <div id="heading">Написанные пользователем {item.names} посты:</div>
                        {card[item.key].map(post => (
                            <div class="post">
                                <div class="element one">{card[item.key].indexOf(post) + 1}. Title: </div>
                                <div class="element two">{post["title"]}</div>
                                <br />
                                <div class="element three">Body: </div>
                                <div class="element four">{post["body"]}</div>
                            </div>
                        ))}
                    </div>
                </>
            ))}
        </div>
    );
};