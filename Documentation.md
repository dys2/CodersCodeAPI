## The Coders Code

#

### Models

#### User
```
{
  username: 'dys2',
  email: 'dys2@gmail.com,
  password: 'iu$Ddf9hedSxesECjad',
  creation_date: Oct. 5, 2017,
  picture: 'http://res.cloudinary.com/dys2/image/upload/v1509409357/fupc1k0p2efrjjgozsgv.jpg',
  liked: ['59ed38bbf90c0c0004540959']
}
```

#### Post
```
{
  title: 'My Post',
  author: 'dA54dgfKLsf4F',
  content: 'This is my posts content',
  picture: 'http://res.cloudinary.com/dys2/image/upload/v1509409357/fupc1k0p2znrjjgozsgv.jpg',
  tags: ['react', 'lambda'],
  created_At: Oct. 5, 2017,
  likes: 200,
  comments: []
}
```

#### Comments
```
{
  text: 'What a cool post!!',
  author: '59ed38bbf90c0c1104540959',
  likes: 6,
  created_at: Oct. 6, 2017,
}
```

#

### Routes

#### User

`[POST] '/login'`
##### Request
```
{
  username: 'dys2',
  password: 'abc123'
}
```

##### Response
```
{
  token: DSJFN083.0N9ERIE49584.NC3349,
  user: {
    _id: '59ed38bbf90c0c0004540959'
    username: 'dys2',
    email: 'dys2@gmail.com',
    picture: 'http://res.cloudinary.com/dys2/image/upload/v1509409357/ferc1k0p2znrjjgozssf.jpg',
    liked: []
  }
}
```

`[POST] '/register'`
##### Request
```
{
  username: 'dys2',
  email: 'dys2@gmail.com',
  password: 'abc123',
  picture: data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQEBAQIBAQECAg...
}
```

##### Response
```
{
  token: DSJFN083.0N9ERIE49584.NC3349
}
```

`[GET] '/auth'`
##### Request
```
{
  headers: { 
    authorization: FSDJ34543fDSK34
    }
}
```

##### Response
```
{
  user: {
    _id: '59ed38bbf90c0c0004540959'
    username: 'dys2',
    email: 'dys2@gmail.com',
    picture: 'http://res.cloudinary.com/dys2/image/upload/v1509409357/ferc1k0p2znrjjgozssf.jpg',
  }
}
```

`[PUT] '/register'`
##### Request
```
{
  body: {
    username: 'dys3',
    email: 'dys3@gmail.com',
    password: 'UpdatedPassword123',
    picture: data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQEBAQIBAQECAg...
  }
  headers: { 
    authorization: FSDJ34543fDSK34
    }
}
```

##### Response
```
{
  user: {
    _id: '59ed38bbf90c0c0004540959'
    username: 'dys3',
    email: 'dys3@gmail.com',
    picture: 'http://res.cloudinary.com/dys2/image/upload/v1509409357/ferc1k0p2eormm.jpg',
    liked: [],
  }
}
```

`[GET] '/user/:id'`
##### Request
```
{
headers: {
authorization: FSDJ34543fDSK34
}
}
```

##### Response
```
{
_id: 59ed38bbf90c0c0004540959
username: 'dys2',
email: 'dys2@aol.com',
liked: [],
picture: 'http://res.cloudinary.com/dys2/image/upload/v1509409357/ferc1k0p2znrjjgozssf.jpg',
}
```


#### Posts

`[POST] '/post'`
##### Request
```
{
  body: {
    title: 'Post title',
    content: 'this is the post's content',
    author:'59ed38bbf90c0c0004540959',
    tags: ['react', 'redux'],
    likes: [],
    picture: data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQEBAQIBAQECAg...,
  }
  headers: { 
    authorization: FSDJ34543fDSK34
    }
}
```

##### Response
```
{
  _id: 59ed38bbf90c0c0004540976
}
```

`[GET] '/post/:id'`
##### Request
```
{
  headers: { 
    authorization: FSDJ34543fDSK34
    }
}
```

##### Response
```
{
  _id: 59ed38bbf90c0c0004540959
  title: 'Post title',
  content: 'this is the post's content',
  author: {
    username: 'dys2',
    picture: 'http://res.cloudinary.com/dys2/image/upload/v1509409357/ferc1k0p2znrjjgozssf.jpg'
  },
  likes: [],
  tags: ['react', 'redux']
  picture: 'http://res.cloudinary.com/dys2/image/upload/v1509409357/ferc1k0p2zn5mdnico.jpg',
  comments: []
}
```

`[PUT] '/post/:id'`
##### Request
```
{
  body: {
    comments: ['my first comment']
  }
  headers: { 
    authorization: FSDJ34543fDSK34
    }
}
```

##### Response
```
{
  _id: 59ed38bbf90c0c0004540959
  title: 'Post title',
  content: 'this is the post's content',
  author: {
    _id:  59ed38bbf90c0c0004540959,
    username: 'dys2',
    liked: [],
    picture: 'http://res.cloudinary.com/dys2/image/upload/v1509409357/ferc1k0p2znrjjgozssf.jpg'
  },
  tags: ['react', 'redux'],
  likes: [],
  picture: 'http://res.cloudinary.com/dys2/image/upload/v1509409357/ferc1k0p2znrjfsdcdssf.jpg',
  comments: ['my first comment']
}
```

`[GET] '/posts`

##### Response
```
[{
  id: 59ed38bbf90c0c0004540968
  title: 'Post title',
  content: 'this is the post's content',
  likes: [],
  author: {
    _id: 59ed38bbf90c0c0004540959
    username: 'dys2',
    liked: [59ed38bbf90c0c0004540969],
    picture: 'http://res.cloudinary.com/dys2/image/upload/v1509409357/ferc1k0p2znrjjgozssf.jpg'
  },
  tags: ['react', 'redux']
  picture: 'http://res.cloudinary.com/dys2/image/upload/v1509409357/fZsrc1k0p2znr5kcemc.jpg',
  comments: []
},
{
  id: 59ed38bbf90c0c0004540969
  title: 'Post title 2',
  content: 'this is the second post's content',
  likes: [59ed38bbf90c0c0004540959, 59ed38bbf90c0c0004540887],
  author: {
  _id: 59ed38bbf90c0c0004540960
    username: 'dys3',
    likes: [],
    picture: 'http://res.cloudinary.com/dys2/image/upload/v1509409357/ferc1k0p2znrjjgeoirir.jpg'
  },
  tags: ['mongodb', 'jwt']
  picture: 'http://res.cloudinary.com/dys2/image/upload/v1509409357/ferc1k0p2znrjjgoeooo.jpg',
  comments: []
}]
```

`[POST] '/usersPosts'`
##### Request
```
{
  body: {
    author: f4f4SDF49jncDLL994n,
  }
  headers: { 
    authorization: FSDJ34543fDSK34
    }
}
```

##### Response
```
[{
  _id: 59ed38bbf90c0c0004540968
  title: 'Post title',
  content: 'this is the post's content',
  likes: [],
  author: {
    _id: 59ed38bbf90c0c0004540959
    liked: [],
    username: 'dys2',
    picture: 'http://res.cloudinary.com/dys2/image/upload/v1509409357/ferc1k0p2znrjjgozssf.jpg'
  },
  tags: ['react', 'redux']
  picture: 'http://res.cloudinary.com/dys2/image/upload/v1509409357/faserc1k0d7cmnmiidme.jpg',
  comments: []
},
{
  _id: 59ed38bbf90c0c0004540973
  title: 'Post title 2',
  content: 'this is the second post's content',
  likes: [],
  author: {
    _id: 59ed38bbf90c0c0004540959,
    liked: [],
    username: 'dys2',
    picture: 'http://res.cloudinary.com/dys2/image/upload/v1509409357/ferc1k0p2znrjjgozssf.jpg'
  },
  tags: ['ajax', 'crud']
  picture: 'http://res.cloudinary.com/dys2/image/upload/v1509409357/afacs1k0p2znrjjgozece.jpg',
  comments: []
}]
```


`[PUT] '/post/like'`
##### Request
```
{
  body: {
    postId: '59ed31abf90c0c0004540984',
    authorId:'59ed38bbf90c0c0004540959',
  },
  headers: {
    authorization: FSDJ34543fDSK34
  }
}
```

##### Response
```
{
  _  id: 59ed38bbf90c0c0004540959,
  liked: [59ed31abf90c0c0004540984],
  username: 'dys2',
  picture: 'http://res.cloudinary.com/dys2/image/upload/v1509409357/ferc1k0p2znrjjgozssf.jpg'
}
```

`[PUT] '/post/removeLike'`
##### Request
```
{
  body: {
    postId: '59ed31abf90c0c0004540984',
    authorId:'59ed38bbf90c0c0004540959',
  },
  headers: {
    authorization: FSDJ34543fDSK34
  }
}
```

##### Response
```
{
  _id: 59ed38bbf90c0c0004540959,
  liked: [],
  username: 'dys2',
  picture: 'http://res.cloudinary.com/dys2/image/upload/v1509409357/ferc1k0p2znrjjgozssf.jpg'
}
```


`[GET] '/browse/top`
##### Request
```
{
  headers: {
    authorization: FSDJ34543fDSK34
  }
}
```

##### Response
```
{
  _id: 83ed38bbf90c0c000454432
  title: 'Post title',
  content: 'this is the post's content',
  author: {
    _id: 59ed38bbf90c0c0004540959,
    username: 'dys2',
    picture: 'http://res.cloudinary.com/dys2/image/upload/v1509409357/ferc1k0p2znrjjgozssf.jpg'
  },
  likes: [59ed38bbf90c0c0004540953, 59ed38bbf90c0c0004540922, 59ed38bbf90c0c0004540988],
  tags: ['react', 'redux']
  picture: 'http://res.cloudinary.com/dys2/image/upload/v1509409357/ferc1k0p2znrjevmeef.jpg',
  comments: []
},
{
_id: 83ed38bbf90c0c0004545452
title: 'Another post title',
content: 'this is the post's content',
author: {
    _id: 59ed38bbf90c0c0004540959,
    username: 'dys2',
    picture: 'http://res.cloudinary.com/dys2/image/upload/v1509409357/ferc1k0p2znrjjgozssf.jpg'
},
likes: [59ed38bbf90c0c0004540953, 59ed38bbf90c0c0004540988],
tags: ['es6', 'redux']
picture: 'http://res.cloudinary.com/dys2/image/upload/v1509409357/ferc1k0icmds9egozssf.jpg',
comments: []
},
etc...
```

## TO DO

  *  Remove User

  * Update post
  
  * DM system

