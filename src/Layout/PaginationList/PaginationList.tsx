import { selectTotalArticle } from "features/article/articleSlice";
import React from "react";
import { Pagination } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
export interface PaginationState {
  limit: number;
}
export default function PaginationList({ limit }: PaginationState) {
  let [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page") || "1";
  const totalArticle = useSelector(selectTotalArticle);
  const totalPage = Math.ceil(totalArticle / limit);
  const handleChangePage = (page: number) => {
    setSearchParams({ page: String(page) });
  };
  const handleDecrement = (page: number) => {
    if (page === 1) {
      return;
    }
    setSearchParams({ page: String(page - 1) });
  };
  const handleIncrement = (page: number) => {
    if (page === totalPage) {
      return;
    }
    setSearchParams({ page: String(page + 1) });
  };
  const renderPage = () => {
    const listPage = [];
    for (let i = 1; i <= totalPage; i++) {
      listPage.push(
        <Pagination.Item key={i} onClick={() => handleChangePage(i)} active={i === Number(currentPage)}>
          {i}
        </Pagination.Item>
      );
    }
    return listPage;
  };
  return totalPage > 1 ? (
    <Pagination>
      <Pagination.Prev onClick={() => handleDecrement(Number(currentPage))} disabled={Number(currentPage) === 1} />
      {renderPage()}
      <Pagination.Next
        onClick={() => handleIncrement(Number(currentPage))}
        disabled={Number(currentPage) === totalPage}
      />
    </Pagination>
  ) : null;
}
