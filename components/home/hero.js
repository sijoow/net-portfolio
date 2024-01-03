
import Link from "next/link"
import Animation from "../animation"
export default function Hero(){
  return(
    <>
      <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">프론트앤드 개발자 이승환입니다.
        <br className="hidden lg:inline-block"/>
      </h1>
      <p className="mb-8 leading-relaxed">
        프론트 개발자 7년차 개발자 시대에 맞춰 <br/>발전하는 개발자가 되는것이 목표인
        프론트 앤드 개발자 입니다. 잘부탁드립니다.
      </p>
      <div className="flex justify-center">
           <Link href="/project" className=""><button className="inline-flex text-white bg-indigo-800 border-0 py-2 px-6
            focus:outline-none hover:bg-indigo-600 rounded text-lg ">
          프로젝트 보러가기
          </button></Link>        
      </div>
    </div>
    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
      <Animation/> 
    </div>
  </>
  )
}