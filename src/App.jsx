import { Routes, Route } from "react-router";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import CreatePost from "./components/CreatePost";
import PostsList from "./components/PostsList";
import EditPost from "./components/EditPost";
import PostView from "./components/PostView";
import ProtectedRoute from "./components/ProtectedRoute";
import About from "./components/About";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/posts/view/:postId" element={<PostView />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/posts/create"
                element={
                    <ProtectedRoute>
                        <CreatePost />
                    </ProtectedRoute>
                }
            />
            <Route path="/posts/:postId" element={<EditPost />} />
            <Route path="/posts" element={<PostsList />} />
        </Routes>
    );
}

export default App;
