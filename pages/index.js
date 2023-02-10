import Characters from './characters';

export default function Home() {
  return (
    
    <nav className="navbar navbar-light bg-light">
    <form className="form-inline" onSubmit={Characters}> 
        <a className="btn btn-outline-success my-2 my-sm-0" href="/characters">Liste Personnages</a>
    </form>
    <h1 className="col-sm-6"> Rick et Morty</h1>
    </nav>
  );
}