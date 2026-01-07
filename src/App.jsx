import { Routes, Route } from "react-router";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import CreatePost from "./components/CreatePost";
import PostsList from "./components/PostsList";
import EditPost from "./components/EditPost";
import PostView from "./components/PostView";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts/view/:postId" element={<PostView />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/posts/create" element={<CreatePost />} />
            <Route path="/posts/:postId" element={<EditPost />} />
            <Route path="/posts" element={<PostsList />} />
        </Routes>
    );
}

export default App;
