import React, { useState } from "react";
import moment from "moment";
import LogoImg from "../../assets/card-logo.png";
import StarIcon from "../../assets/star.png";
import * as S from "./CardStyle";
import KebabIcon from "../../assets/kebab.svg";
function calculateTimeAgo(createdAt) {
  const createdDate = moment(createdAt, "YYYY-MM-DDTHH:mm:ss[Z]");
  const currentDate = moment();
  const diff = currentDate.diff(createdDate, "seconds");

  if (diff < 120) {
    return "1 minute ago";
  } else if (diff <= 3540) {
    return `${Math.floor(diff / 60)} minutes ago`;
  } else if (diff < 3600) {
    return "1 hour ago";
  } else if (diff <= 82800) {
    return `${Math.floor(diff / 3600)} hours ago`;
  } else if (diff < 86400) {
    return "1 day ago";
  } else if (diff <= 2592000) {
    return `${Math.floor(diff / 86400)} days ago`;
  } else if (diff <= 28512000) {
    return `${Math.floor(diff / 2592000)} months ago`;
  } else if (diff <= 31536000) {
    return "1 year ago";
  } else {
    return `${Math.floor(diff / 31536000)} years ago`;
  }
}

function Card({ link }) {
  const [isOpenKebab, setIsOpenKebab] = useState(false);

  const isOpenKebabHandle = (e) => {
    e.preventDefault();
    setIsOpenKebab(!isOpenKebab);
    console.log("hio");
  };
  return (
    <S.CardContainer href={link.url}>
      <S.CardImageContainer>
        <S.CardImage
          className={
            link.imageSource || link.image_source ? "Card-image" : "no-img-logo"
          }
          src={
            link.imageSource || link.image_source
              ? link.imageSource || link.image_source
              : LogoImg
          }
          alt="카드 사진"
        />
        <img src={StarIcon} className="star-icon" />
      </S.CardImageContainer>

      <S.CardContentContainer>
        <S.CardContentAgo>
          {calculateTimeAgo(link.createdAt || link.created_at)}
        </S.CardContentAgo>
        <img
          src={KebabIcon}
          className="kebab-button"
          onClick={isOpenKebabHandle}
        />
        {isOpenKebab && <Kebab />}
        <S.CardContent>{link.description}</S.CardContent>
        <S.CardContentAt>
          {moment(link.createdAt || link.created_at).format("YYYY.MM.DD")}
        </S.CardContentAt>
      </S.CardContentContainer>
    </S.CardContainer>
  );
}

function Kebab() {
  return (
    <>
      <S.OptionContainer>
        <option>삭제하기</option>
        <option>폴더에 추가</option>
      </S.OptionContainer>
    </>
  );
}

export default Card;
