/** @jsx React.DOM */

var React = require("react");
var Link = require('react-router').Link;
var Sparkline = require('./sparkline');

var MONTHS = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];

var formatDate = function (date) {
  return MONTHS[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
};

function integerWithThousandsSeparator(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

var SurveyTableRow = React.createClass({
  propTypes: {
   survey: React.PropTypes.shape({
      id: React.PropTypes.string.isRequired,
      title: React.PropTypes.string.isRequired,
      publishedDate: React.PropTypes.instanceOf(Date).isRequired,
      modifiedDate: React.PropTypes.instanceOf(Date).isRequired,
      activity: React.PropTypes.array.isRequired
    }).isRequired
  },

  render: function() {
    var survey = this.props.survey;

    var total = survey.activity.reduce(function (memo, n) {
      return memo + n;
    }, 0);

    return (
      <tr>
        <td>
          <Link to='take' surveyId={survey.id} className='title'>
            {survey.title}
          </Link>
        </td>
        <td className='published'>{formatDate(survey.publishedDate)}</td>
        <td className='modified'>{formatDate(survey.modifiedDate)}</td>
        <td className='total'>{integerWithThousandsSeparator(total)}</td>
        <td className='activity'>
          <Sparkline points={survey.activity} />
        </td>
        <td>
          <input type='text' value='http://localhost:3000/surveys/1'/>
        </td>
        <td>
          <Link to='edit' surveyId={survey.id} className="btn btn-link btn-editSurvey edit">
            <i className="glyphicon glyphicon-pencil"></i>
          </Link>
        </td>
      </tr>
    );
  }
});

module.exports = SurveyTableRow;
