import React, { Component } from "react";
import Header from "./components/Header";
import Loading from "./components/Loading";
import { PopupboxManager, PopupboxContainer } from "react-popupbox";
import "../node_modules/react-popupbox/dist/react-popupbox.css";
import "../node_modules/bulma/css/bulma.css";
import "./App.css";

export default class App extends Component {
  state = {
    isOpen: false,
    sections: [],
    current: null,
    dataRoute:
      "https://unsplash-gallery.herokuapp.com/wordpress/?rest_route=/sections/v1/post"
  };

  get scaledSections() {
    const nbr = (this.state.sections.length / 3).toString().split(".");
    const sections = [];

    for (let i = 0; i < nbr[0]; i++) {
      sections[i] = [];

      for (let j = 1; j <= 3; j++) {
        sections[i].push(this.state.sections[i * 3 + j - 1]);
      }
    }

    if (nbr[1]) {
      const missing = nbr[1].startsWith("3") ? 1 : 2;

      sections.push([]);

      for (let k = 0; k < missing; k++) {
        sections[sections.length - 1].push(this.state.sections[nbr[0] * 3 + k]);
      }
    }

    return sections;
  }

  async componentDidMount() {
    // error handling is important when fetching data
    try {
      await fetch(this.state.dataRoute)
        .then(res => res.json())
        .then(sections =>
          this.setState((prevState, props) => {
            return { sections: sections.map(this.mapSection) };
          })
        );
    } catch (error) {
      console.log(error);
    }
  }

  mapSection(section) {
    return {
      img: section.acf.image,
      src: section.acf.image.url,
      title: section.post_title,
      key: section.post_title,
      description: section.post_content,
      author: {
        name: section.acf.author_name,
        link: section.acf.author_link
      }
    };
  }

  openPopupbox(section) {
    const content = (
      <div>
        <img
          src={section.src}
          width={section.img.sizes["large-width"]}
          alt=""
        />
        <p>
          {section.title} - {section.description}
        </p>
        <p>
          <a href={section.author.link}>{section.author.name}</a>
        </p>
      </div>
    );

    PopupboxManager.open({ content });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Header />
        </header>
        {this.state.sections.length === 0 && <Loading />}
        <div className="main">
          {this.scaledSections.map((level, i) => (
            <div className="columns" key={i}>
              {level.map((section, j) => (
                <div className="column" key={j}>
                  <img
                    className="image"
                    alt=""
                    src={section.src}
                    height={section.img["small-height"]}
                    onClick={() =>
                      this.openPopupbox(this.state.sections[i * 3 + j])
                    }
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

        <footer>
          <p>
            Made with
            <span role="img" aria-label="emoji">
              💙
            </span>
            by
            <span aria-label="separator">
              <a href="https://snipcart.com/blog/reactjs-wordpress-rest-api-example">
                Snipcart
              </a>
            </span>
          </p>
          <span aria-label="footer-links">
            <a href="https://twitter.com/snipcart">Twitter</a>
            <a href="https://github.com/snipcart/wordpress-react">GitHub</a>
            <a href="https://facebook.com/snipcart">Facebook</a>
          </span>
        </footer>
        <PopupboxContainer />
      </div>
    );
  }
}
