import React, { Component } from "react";

class index extends Component {
  render() {
    const { data, onPageChange, previousChange ,disablePrevious } = this.props;
    return (
      <div style={{ marginBottom: "30px" }}>
        <div className="pagination">
          <a
            href="javascript:void(0);"
            onClick={previousChange}
            style={{cursor :  disablePrevious? 'not-allowed' : 'default' }}
          >
            &laquo;
          </a>
          {data.length > 0 ? (
            data.map((d, i) => (
              <a href="javascript:void(0);" onClick={onPageChange}>
                {i}
              </a>
            ))
          ) : 
            <a href="javascript:void(0);"> 1</a>
        }
          <a
            href="javascript:void(0);"
            onClick={onPageChange}
            style={{cursor :  disablePrevious ? 'not-allowed' : 'default' }}
          >
            &raquo;
          </a>
        </div>
      </div>
    );
  }
}

export default index;
