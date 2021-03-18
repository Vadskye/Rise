def rolltemplate_html():
    return """
<rolltemplate class="rolltemplate-custom">
  <div class="container color-{{color}}">
    <div class="header">
      {{#title}}<div class="title">{{title}}</div>{{/title}}
      {{#subtitle}}<div class="subtitle">{{subtitle}}</div>{{/subtitle}}
    </div>
    <div class="content">
      {{#allprops() title subtitle desc color}}
      <div class="key">{{key}}</div>
      <div class="value">{{value}}</div>
      {{/allprops() title subtitle desc color}}
      {{#desc}}<div class="desc">{{desc}}</div>{{/desc}}
    </div>
  </div>
</rolltemplate>
    """

def rolltemplate_css():
    jakob_default = """
/* Smaller margins - remove these if you want the huge default left margin */
.rolltemplate-custom {
  margin-left: -37px;
}
.withoutavatars .rolltemplate-custom {
  margin-left: -7px;
}

.rolltemplate-custom .container {
  border: 1px solid;
  /* by default, the border is the same color as the header. You can change this here, e.g. to black */
  border-color: var(--header-bg-color);
}

/* Header formatting - title and subtitle */
.rolltemplate-custom .header {
  background-color: var(--header-bg-color);
  /* change text-align to center to center the header text */
  text-align: left;
  color: var(--header-text-color);
  padding: 5px;
}
.rolltemplate-custom .title {
  font-size:1.1em;
  font-weight: 600;
}
.rolltemplate-custom .subtitle {
  font-size:.9em;
}

/* example colors */
.rolltemplate-custom .container {
  /* this is the default color */
  --header-bg-color: rgba(112,32,130,1);
  --header-text-color: #FFF;
}
.rolltemplate-custom .container.color-red {
  --header-bg-color: #F00;
}

/* Allprops part */
.rolltemplate-custom .content {
  display: grid;
  background: #FFF;
  /* Header formatting - modify the column layout below */
  grid-template-columns: auto auto;
  /* Line height to match default roll template */
  line-height:1.4em;
}
.rolltemplate-custom .content > div {
  padding: 5px;
}

/* Left column */
.rolltemplate-custom .content .key {
  font-weight: bold;
  padding-right: 10px;
  text-align: right;
}

/* Empty rule, use this if you want to change the right column
.rolltemplate-custom .value {
}
*/

/* Make even-numbered rows grey */
.rolltemplate-custom .content :nth-child(4n+3),
.rolltemplate-custom .content :nth-child(4n) {
  background:#EEE;
}

/* Description field */
.rolltemplate-custom .desc {
  grid-column: span 2;
  padding: 5px;
  text-align: center;
}
"""
    rise_custom = """
.rolltemplate-custom .container.color-monster {
  --header-bg-color: #8B0000;
}
.rolltemplate-custom .container.color-black {
  --header-bg-color: #000000;
}
.rolltemplate-custom .container.color-blue {
  --header-bg-color: #00008B;
}
.rolltemplate-custom .container.color-bluegreen {
  --header-bg-color: #008B8B;
}
.rolltemplate-custom .container.color-brown {
  --header-bg-color: #65350F;
}
.rolltemplate-custom .container.color-gold {
  --header-bg-color: #B8860B;
}
.rolltemplate-custom .container.color-gray {
  --header-bg-color: #696969;
}
.rolltemplate-custom .container.color-green {
  --header-bg-color: #006400;
}
.rolltemplate-custom .container.color-orange {
  --header-bg-color: #CC5500;
}
.rolltemplate-custom .container.color-purple {
  --header-bg-color: #800080;
}
"""
    return jakob_default + rise_custom
