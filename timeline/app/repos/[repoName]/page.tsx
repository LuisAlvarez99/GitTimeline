'use client'

import React, { useEffect, useState } from 'react'
import TimelineNav from '../../components/TimelineNav'
import Image from "next/image"
import { auth } from "../../auth"
import { useSearchParams } from 'next/navigation';


// import { useSearchParams } from 'next/navigation'
// import { Octokit } from '@octokit/core'


export default function projectName({ params }) {
    const repoName = params.repoName;
    const searchParams = useSearchParams();
    const repoParam = searchParams.get('repo');
    // const sessionParam = searchParams.get('session');
    // console.log(sessionParam)
    console.log("LOGGING REPO PARAM: ", JSON.parse(repoParam));
    const repo = repoParam ? JSON.parse(repoParam) : null;
    const [repoLangs, setrepoLangs] = useState([]);
    const [repoCommits, setrepoCommits] = useState([]);
    const [repoContents, setrepoContents] = useState([]);
    const [readMe,setReadMe] = useState();
    // console.log(repoName + " ------- " + repo.languages_url + '\n' + Object.keys(repo));
    // console.log(repoName + " ------- " + JSON.parse(repoParam).languages_url + '\n' + Object.keys(repo));

    useEffect(() => {
        if (repo.languages_url){
            fetch(repo.languages_url)
            .then(response => response.json())
            .then(data => {
                setrepoLangs(Object.keys(data));
            })
            .catch(error => console.error("error fetching languages: ", error));
        }
        if (repo.commits_url){
            fetch(repo.commits_url.slice(0, -6))
            .then(response => response.json())
            .then(data => {
                data.map((commit) => {
                    setrepoCommits(Object.values(data));
                })
            })
            .catch(error => console.error("error fetching languages: ", error));
        }
        if (repo.contents_url){
            fetch(repo.contents_url.slice(0, -8))
            .then(response => response.json())
            .then(data => {
                data.map((content) => {
                    setrepoContents(Object.values(data));
                    if(content.name === "README.md"){
                        let contentURL = content.download_url;
                        fetch(contentURL).then(response => response.text()).then(data => {
                            setReadMe(data);
                            // console.log("LOGGING README FILE: ", data);
                        });
                        // console.log("README: ", readMe);
                    }
                })
            })
            .catch(error => console.error("error fetching languages: ", error));
            
            // fetch(repo.contents_url.slice(0, -7)+"index.html")
            // .then(response => response.text())
            // .then(data => {
            //     console.log("LOGGING README FILE: ", data);
            // });
        }

    }, [repoParam]);
    
    // console.log("LOGGING Content DATA",repo.contents_url.slice(0, -7)+"index.html");
    // console.log("LOGGING LANG DATA",repoLangs.map(lang => ({lang})));;
    // console.log("LOGGING README DATA", readMe);
    console.log("LOGGING DATE DATA: ", repo)


    // const session = await auth()


    return (
        <div className='flex flex-col h-screen w-auto bg-slate-700'>
            <TimelineNav user={repo.sessionName} />
            <span className='border border-blue-500 rounded-md self-center h-5/6 m-10 w-4/5 flex flex-wrap'>
                <span className='self-center h-full w-4/5 flex flex-col '>
                    <h1 className='border-r-2 border-blue-500 justify-self-end w-auto h-1/5'><b>{repo.name}</b></h1>
                    <div className='border-r-2 overflow-y-scroll border-blue-500  w-auto h-2/5'>
                        {repoContents.map(content => (
                            <h1 className=' bg-red-300 py-5 border-blue-500'>{content.name}</h1>
                        ))}
                    </div>
                    <div className='h-3/5 border-r-2 overflow-y-scroll border-blue-500 '>
                        {repoCommits.map(commit => (
                            <div className=' bg-green-300 py-5 border-blue-500'>
                                <span className='flex flex-col text-sm'>
                                {repo.formattedDate.split(", ").map(date => (
                                    <h4 className='text-sm'>{date}</h4>
                                ))}
                                </span>
                                :{commit.commit.message}
                            </div>
                        ))}
                    </div>
                </span>
                <div className='h-full w-1/5 self-end'>
                    <div className='pt-5 h-1/5 border-l-2 border-red-600 flex justify-evenly'>
                        <Image className='size-10 rounded-full' width={10} height={10} src={repo.owner.avatar_url} alt='userpfp' />
                        <h1 className='pt-2'>{repo.owner.login}</h1>
                    </div>
                    <div className='h-1/5 border-l-2 border-red-600'>
                        {repoLangs.map(key => (
                            <h1 className='border-red-600'>{key}</h1>
                        ))}
                    </div>
                    <div className='h-3/5 overflow-y-scroll border-l-2 shadow-2xl border-red-600'>
                        {readMe}
                    </div>
                </div>
            </span>

        </div>
    )
}