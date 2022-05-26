import { avatar } from "components/icons";
import React from "react";

export default function Home() {
  return (
    <main className="articles">
      <div className="articles-body">
        <div className="articles-item">
          <div className="articles-author">
            <img src={avatar} alt="" className="articles-avatar" />
            <div className="articles-online">
              <h6 className="articles-name">Prothinidi Thomas</h6>
              <span className="articles-time"> New feed November 24, 2021</span>
            </div>
          </div>
          <div className="articles-content">
            <h5 className="articles-title">Create a new implementation</h5>
            <p className="articles-descript">
              If you think adventure is dangerous, try routine, it’s lethal Paulo Coelho! Good morning all friends.
            </p>
            <div className="articles-bottom">
              <div className="tags">
                <span className="tags-item">implements</span>
                <span className="tags-item">reactjs</span>
              </div>
              <div className="articles-favorite">
                <h6>2,162,350 likes</h6>
                <button className="articles-heart active">
                  <i className="fa-solid fa-heart"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="articles-item">
          <div className="articles-author">
            <img src={avatar} alt="" className="articles-avatar" />
            <div className="articles-online">
              <h6 className="articles-name">Prothinidi Thomas</h6>
              <span className="articles-time"> New feed November 24, 2021</span>
            </div>
          </div>
          <div className="articles-content">
            <h5 className="articles-title">Create a new implementation</h5>
            <p className="articles-descript">
              If you think adventure is dangerous, try routine, it’s lethal Paulo Coelho! Good morning all friends.
            </p>
            <div className="articles-bottom">
              <div className="articles__tags">
                <span className="articles__tags--item">implements</span>
                <span className="articles__tags--item">reactjs</span>
              </div>
              <div className="articles-favorite">
                <h6>2,162,350 likes</h6>
                <button className="articles-heart active">
                  <i className="fa-solid fa-heart"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="articles-item">
          <div className="articles-author">
            <img src={avatar} alt="" className="articles-avatar" />
            <div className="articles-online">
              <h6 className="articles-name">Prothinidi Thomas</h6>
              <span className="articles-time"> New feed November 24, 2021</span>
            </div>
          </div>
          <div className="articles-content">
            <h5 className="articles-title">Create a new implementation</h5>
            <p className="articles-descript">
              If you think adventure is dangerous, try routine, it’s lethal Paulo Coelho! Good morning all friends.
            </p>
            <div className="articles-bottom">
              <div className="articles__tags">
                <span className="articles__tags--item">implements</span>
                <span className="articles__tags--item">reactjs</span>
              </div>
              <div className="articles-favorite">
                <h6>2,162,350 likes</h6>
                <button className="articles-heart active">
                  <i className="fa-solid fa-heart"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="articles-item">
          <div className="articles-author">
            <img src={avatar} alt="" className="articles-avatar" />
            <div className="articles-online">
              <h6 className="articles-name">Prothinidi Thomas</h6>
              <span className="articles-time"> New feed November 24, 2021</span>
            </div>
          </div>
          <div className="articles-content">
            <h5 className="articles-title">Create a new implementation</h5>
            <p className="articles-descript">
              If you think adventure is dangerous, try routine, it’s lethal Paulo Coelho! Good morning all friends.
            </p>
            <div className="articles-bottom">
              <div className="articles__tags">
                <span className="articles__tags--item">implements</span>
                <span className="articles__tags--item">reactjs</span>
              </div>
              <div className="articles-favorite">
                <h6>2,162,350 likes</h6>
                <button className="articles-heart active">
                  <i className="fa-solid fa-heart"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="articles-right">
        <header className="articles-header">
          <span>Tags</span>
          <i className="fa-solid fa-ellipsis"></i>
        </header>
        <div className="articles__tags--content">
          <div className="tags">
            <span className="tags-item">implements</span>
            <span className="tags-item">react</span>
            <span className="tags-item">angular</span>
            <span className="tags-item">global</span>
            <span className="tags-item">discovery</span>
            <span className="tags-item">games</span>
          </div>
        </div>
      </div>
    </main>
  );
}
