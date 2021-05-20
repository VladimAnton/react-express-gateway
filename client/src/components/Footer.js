import React from 'react'

export const  Footer = () => {
    return(
      <footer className="page-footer  blue darken-1">
        <div className="container">
          <div className="row">
            <div className="blue darken-1">
              <h5 className="white-text">Дипломаная работа</h5>
              <p className="grey-text text-lighten-4">Тема дипломной работы: «Технології створення сучасних Web-додатків для розсилки SMS-повідомлень через Інтернет з Web- інтерфейсу».</p>
            </div>
          </div>
        </div>
        <div className="footer-copyright  blue darken-3">
          <div className="container">
          © 2021 Alexander Skliarov Diploma Work
          <a className="grey-text text-lighten-4 right" href="https://www.kpi.kharkov.ua/ukr/" target="_blank" rel="noreferrer">НТУ "ХПІ"</a>
          </div>
        </div>
      </footer>
    )
}