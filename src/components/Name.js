import List from "./List";

function Name(name) {
    return(
        <div>
            {name.name.map((name, i) => (
                <List key={i} name={name} />
            ))}
        </div>
    )
}

export default Name