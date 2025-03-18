import { useState } from "react";
import Image from "next/image";

const getTagClass = (tagName) => {
  const lowerTag = tagName.toLowerCase();
  if (lowerTag === "node") {
    return "bg-green-300 dark:bg-green-800";
  } else if (lowerTag === "nextjs") {
    return "bg-red-300 dark:bg-red-800";
  } else if (lowerTag === "taillwindcss") {
    return "bg-cyan-300 dark:bg-cyan-800";
  } else if (lowerTag === "ejs") {
    return "bg-yellow-300 dark:bg-yellow-800";
  } else if (lowerTag === "javascript") {
    return "bg-lime-300 dark:bg-lime-800";
  } else if (lowerTag === "php") {
    return "bg-purple-300 dark:bg-purple-800";
  } else if (lowerTag === "bootstrap") {
    return "bg-teal-300 dark:bg-teal-800";
  } else if (lowerTag === "cafe24") {
    return "bg-blue-300 dark:bg-blue-800";
  } else if (lowerTag === "css") {
    return "bg-indigo-300 dark:bg-indigo-800";
  } else if (lowerTag === "react") {
    return "bg-gray-300 dark:bg-gray-800";
  }
  return "bg-sky-300 dark:bg-sky-800";
};


export default function ProjectItem({ data }) {
  const [modalOpen, setModalOpen] = useState(false);
  const title = data.properties.이름.title[0].plain_text;
  const githubLink = data.properties.Github.url;
  const description = data.properties.Description.rich_text[0].plain_text;
  const imageSrc = data.cover?.file?.url || data.cover?.external?.url;
  const tags = data.properties.관련기술.multi_select;
  const SiteLink = data.properties.URL.url;

  const openModal = (e) => {
    // 카드 전체 클릭 시 모달 오픈
    e.preventDefault();
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div
        onClick={openModal}
        className="border mt-2 rounded-md overflow-hidden flex flex-col h-full cursor-pointer"
      >
        {/* 이미지 영역: 비율 유지 */}
        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt="cover image"
              layout="fill"
              objectFit="cover"
              quality={100}
              className="cursor-pointer"
            />
          ) : (
            <div
              className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
              style={{ background: "#ddd" }}
            >
              <p className="text-gray-900 dark:text-black-600">
                No image available
              </p>
            </div>
          )}
        </div>
        {/* 콘텐츠 영역: flex-1로 남은 공간 채우기 */}
        <div className="p-4 flex flex-col w-full flex-1 text-gray-900 dark:text-black-600">
          <div className="w-full text-2xl font-bold break-words">{title}</div>
          <div className="w-full mt-2 text-xs leading-5 break-words">
            {description}
          </div>
          {/* SiteLink 값이 있는 경우에만 렌더링 */}
          {SiteLink && (
            <a
              href={SiteLink}
              onClick={(e) => {
                e.stopPropagation();
                openModal(e);
              }}
              className="w-full mt-2 text-sm break-words hover:underline dark:text-black dark:hover:text-black"
            >
              라이브 사이트 바로가기
            </a>
          )}
          {/* githubLink 값이 있는 경우에만 렌더링 */}
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-full mt-2 text-sm break-words hover:underline dark:text-black dark:hover:text-black"
            >
              깃 바로가기
            </a>
          )}
          <div className="w-full flex flex-wrap items-start mt-2">
            {tags.map((aTag) => (
              <span
                key={aTag.id}
                className={`px-1 py-0.5 mr-2 mb-2 rounded-md text-xs ${getTagClass(
                  aTag.name
                )} text-gray-900 dark:text-black-600`}
              >
                {aTag.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 모달 팝업 (레이아웃 팝업) */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg overflow-hidden w-[80%] h-[80%] relative">
            {/* 닫기 버튼 */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 rounded-full p-2 text-gray-900 dark:text-black-600"
            >
              X
            </button>
            {/* iframe을 통해 사이트 표시 */}
            <iframe
              src={SiteLink}
              title="라이브 사이트"
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </>
  );
}
