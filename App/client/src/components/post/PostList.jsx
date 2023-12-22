import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Avatar from 'react-avatar'

import moment from "moment";
import "moment/locale/ko";


const PostList = () => {
    const [postList, setPostList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sort, setSort] = useState("최신순");

    const SearchWrap = () => {
        let body = {
            sort: sort,
            searchTerm: searchTerm
        }

        axios.post("/api/post/list", body)
            .then((response) => {
                if (response.data.success) {
                    setPostList([...response.data.postList]);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        SearchWrap();
    })

    const SetTime = (a, b) => {
        if (a !== b) {
            return moment(b).format('YYYY MMMM Do, h:mm') + "(수정됨)";
        } else {
            return moment(a).format('YYYY MMMM Do, h:mm');
        }
    }



    const SearchHandler = () => {
        SearchWrap();
    }


    return (
        <>
            <div className='login__header'>
                <h3>List</h3>
                <p>잠깐 글좀 확인할까?</p>
            </div>

            <div className='list__search'>
                <input
                    type='text'
                    onChange={(e) => setSearchTerm(e.currentTarget.value)}
                    onKeyDown={(e) => {
                        if (e.keyCode === 13) SearchHandler();
                    }}
                />
                <button onClick={() => SearchHandler()}>검색</button>
            </div>
            <div className='list__btn'>
                <button onClick={() => setSort("최신순")}>최신순</button>
                <button onClick={() => setSort("인기순")}>인기순</button>
            </div>

            <div className='list__wrap'>
                {postList.map((post, key) => {
                    console.log(post)
                    return (
                        <div className='list' key={key}>
                            <span className='cate'>교육</span>
                            <h3 className='title'>
                                <Link to={`/detail/${post.postNum}`}>{post.title}</Link>
                            </h3>
                            <p className='desc'>{post.content}</p>
                            <div className='avatar'>
                                <Avatar
                                    size='25'
                                    round={true}
                                    src={post.author.photoURL}
                                />
                                <div className='auth'>{post.author.displayName}</div>
                                <div>{SetTime(post.createdAt, post.updatedAt)}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default PostList