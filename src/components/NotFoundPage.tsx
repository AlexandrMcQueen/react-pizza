import React from 'react';

const NotFoundPage = () => {
    return (
        <div className="content">
            <div className="container container--cart">
                <div className="cart cart--empty">
                    <h2>Помилка
                        <span>😕</span>
                    </h2>
                    <p>
                        Щось пішло не так і нам не вдалось завантажити список піц<br/>
                        Оновіть сторінку,або спробуйте пізніше
                    </p>

                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;