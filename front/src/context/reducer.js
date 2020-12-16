const initialState = { isLoggin: false, user: {}, posts: null };

export const AppReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CHECK_AUTH":
            return {
                ...state,
                isLoggin: action.status
            };
        case "SET_USER":
            const user = { ...action.payload };
            user.postsCollection = user.postsCollection.map((element) => ({ ...element, show: false }));
            return {
                ...state,
                user
            }
        case "SET_POSTS": {
            return {
                ...state,
                posts: action.payload
            }
        }
        case "OPEN_DIALOG": {
            const user = { ...state.user };
            user.postsCollection = user.postsCollection.map(element => ({ ...element, show: false }));
            const postIndex = user.postsCollection.findIndex((element) => element._id === action.payload);
            user.postsCollection[postIndex].show = action.status;
            return {
                ...state,
                user
            };
        }
        case "UPDATE_POST": {
            const user = { ...state.user };
            const postIndex = user.postsCollection.findIndex((element) => element._id === action.id);
            user.postsCollection[postIndex] = Object.assign(user.postsCollection[postIndex], action.payload);
            return {
                ...state,
                user
            };
        }
        case "UPDATE_USER": {
            let user = { ...state.user };
            user = Object.assign(user, action.payload);
            return {
                ...state,
                user
            };
        }
        case "ADD_NEW_POST": {
            const posts = [...state.posts];
            posts.unshift(action.payload);
            return {
                ...state,
                posts
            }
        }
        case "DELETE_POST": {
            const user = { ...state.user };
            user.postsCollection = user.postsCollection.filter((element) => element._id !== action.payload);
            return {
                ...state,
                user
            };
        }
        default:
            return state;
    }
}