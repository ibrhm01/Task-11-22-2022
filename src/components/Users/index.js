import React from 'react'

function Users() {
    const [users, setUsers] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [clicked, setClicked] = React.useState(false);

    const handleClick = React.useCallback(() => {
        setIsLoading(true);
        fetch("https://63635c9e66f75177ea427f02.mockapi.io/people").then((response) => response.json()
        ).then((data) => {
            setUsers(data);
        }).catch(() => {
            console.log("error");
        }).finally(() => {
            setIsLoading(false);
        })

        setClicked(true);

    }, []);

    const handleFilteredData = React.useMemo(() => {
        let test = [];
        if (users) {
            test = users;
        }
        if (clicked) {
            test = test.filter((item) => Number(item.age) > 30 && Number(item.age) < 50);
        }

        return test;

    }, [users, clicked]);


    return (
        <div>
            <button onClick={handleClick}>Filter</button>
            {isLoading ? (<h4>Loading...</h4>) :
                (handleFilteredData.map(({ name, id, age }) => (
                    <h4 key={id}>
                        {id}-{name}-{age}
                    </h4>
                ))
                )}
        </div>
    );
}

export default Users;