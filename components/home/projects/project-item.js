import { useState } from "react";
import Image from "next/image";

const getTagClass = (tagName) => {
  const lowerTag = tagName.toLowerCase();
  if (lowerTag === "node") {
    return "bg-green-200 dark:bg-green-700";
  } else if (lowerTag === "Nextjs") {
    return "bg-red-200 dark:bg-red-700";
  }else if (lowerTag === "TaillwindCss") {
    return "bg-amber-200 dark:bg-amber-700";
  }else if (lowerTag === "ejs") {
    return "bg-yellow-200 dark:bg-yellow-700";
  }else if (lowerTag === "javascript") {
    return "bg-lime-200 dark:bg-lime-700";
  }else if (lowerTag === "php") {
    return "bg-green-200 dark:bg-green-700";
  }else if (lowerTag === "bootstrap") {
    return "bg-teal-200 dark:bg-teal-700";
  }else if (lowerTag === "cafe24") {
    return "bg-blue-200 dark:bg-blue-700";
  }else if (lowerTag === "css") {
    return "bg-indigo-200 dark:bg-indigo-700";
  }else if (lowerTag === "React") {
    return "bg-gray-200 dark:bg-gray-700";
  }
  
  return "bg-sky-200 dark:bg-yellow-700";
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
    // 카드 전체를 클릭할 경우 모달 오픈
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
            <div className="absolute top-0 left-0 w-full h-full bg-gray-300 flex items-center justify-center">
              <p>No image available</p>
            </div>
          )}
        </div>
        {/* 콘텐츠 영역: flex-1로 남은 공간 채우기 */}
        <div className="p-4 flex flex-col w-full flex-1">
          <div className="w-full text-2l font-bold break-words">{title}</div>
          <div className="w-full mt-2 text-xs leading-5 break-words">
            {description}
          </div>
          {/* 라이브 사이트 바로가기: 클릭 시 부모의 onClick과 동일하게 모달 열기 */}
          <a
            href={SiteLink}
            onClick={(e) => {
              e.stopPropagation();
              openModal(e);
            }}
            className="w-full mt-2 text-sm break-words hover:underline"
          >
            라이브 사이트 바로가기
          </a>
          {/* 깃 바로가기: 새 창으로 열고 이벤트 전파 방지 */}
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="w-full mt-2 text-sm break-words hover:underline"
          >
            깃 바로가기
          </a>
          <div className="w-full flex flex-wrap items-start mt-2">
            {tags.map((aTag) => (
              <span
                key={aTag.id}
                className={`px-1 py-0.5 mr-2 mb-2 rounded-md text-xs ${getTagClass(
                  aTag.name
                )}`}
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
              className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 rounded-full p-2"
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
