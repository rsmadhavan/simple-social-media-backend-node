install the packages -- npm i

## endpoints:
### users
- /api/authenticate -- handles signin expects {email,password} returns {jwt token}
- /api/users -- returns user details expects {jwt token} returns {name,email,posts}
- /api/register -- creates user expects {name,email,password} returns user details 
- /api/users/edit -- updates user details expects {name or email or password}(optional) and returns {success}
### posts
- /api/posts -- creates new post expects {title,description} returns {post object}
- /api/posts/:id -- deletes a post expects {post_id} returns {success}
### comments
- /api/comment -- creates new comment expects {comment_text, post_id} returns{comment}
- /api/comment/:id -- deletes the comment expects {post_id} and path_variable {comment_id} returns {success}
