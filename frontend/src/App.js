import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Register from "./pages/register/Register";
import CreatePost from "./components/createPost/CreatePost";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import EditProfile from "./pages/editProfile/EditProfile";
import CreateStory from "./components/createStory/CreateStory";
import StoryView from "./components/storyView/StoryView";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {user ? <Home /> : <Register />}
          </Route>
          <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route exact path="/profile/:username">
            <Profile />
          </Route>
          <Route path="/post">
            <CreatePost />
          </Route>
          <Route path="/edit/profile/:username">
            <EditProfile />
          </Route>
          <Route path="/createstory">
            <CreateStory />
          </Route>
          <Route path="/story/:storyId">
            <StoryView />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
