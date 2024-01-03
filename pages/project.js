
import Layout from "@/components/layout"
import {TOKEN,DATABASE_ID} from "../config"
import Head from "next/head";
import ProjectItem from "@/components/home/projects/project-item"
export default function Projects({projects}){
console.log(projects)
  return(
    <>
        <Layout >
            <div className="flex flex-col items-center justify-center min-h-screen px-3 mb-10">
                <Head>
                    <title>이승환 포트폴리오</title>
                    <meta name="description" content="오늘도 빡코딩!" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <h1 className="text-4xl font-bold sm:text-4xl pb-8 mt-8 float-left text-left ">
                    포토폴리오 :
                    <span className="pl-4 text-blue-500">{projects.results.length}</span>
                </h1>

                <div className="grid grid-cols-1 gap-3  md:grid-cols-5">
                    {projects.results.map((aProject) => (
                        <ProjectItem key={aProject.id} data={aProject}/>
                    ))}
                </div>
            </div>
        </Layout>
    </>
  )
}

//빌드 타임에 호출
export async function getStaticProps() {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Notion-Version': '2022-06-28',
      'content-type': 'application/json',
      Authorization : `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({page_size: 100})
  };
  
  const res = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, options)
  const projects = await res.json()

  const projectNames = projects.results.map((aProject)=>(
    aProject.properties.이름.title[0].plain_text
  ))
  console.log(`projectNames:${projectNames}`)
  return {
    props: {projects}, // will be passed to the page component as props
  }
}