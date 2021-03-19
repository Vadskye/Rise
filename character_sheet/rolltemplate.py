def rolltemplate_html():
    return """
<rolltemplate class="sheet-rolltemplate-custom">
  <div class="sheet-container sheet-color-{{color}}">
    <div class="sheet-header">
      {{#title}}<div class="sheet-title">{{title}}</div>{{/title}}
      {{#subtitle}}<div class="sheet-subtitle">{{subtitle}}</div>{{/subtitle}}
    </div>
    <div class="sheet-content">
      {{#allprops() title subtitle desc color}}
      <div class="sheet-key">{{key}}</div>
      <div class="sheet-value">{{value}}</div>
      {{/allprops() title subtitle desc color}}
      {{#desc}}<div class="sheet-desc">{{desc}}</div>{{/desc}}
    </div>
  </div>
</rolltemplate>
    """

def rolltemplate_css():
    jakob_default = """
/* Smaller margins - remove these if you want the huge default left margin */
.sheet-rolltemplate-custom {
  margin-left: -37px;
}
.withoutavatars .sheet-rolltemplate-custom {
  margin-left: -7px;
}

.sheet-rolltemplate-custom .sheet-container {
  border: 1px solid;
  /* by default, the border is the same color as the header. You can change this here, e.g. to black */
  border-color: var(--header-bg-color);
}

/* Header formatting - title and subtitle */
.sheet-rolltemplate-custom .sheet-header {
  background-color: var(--header-bg-color);
  /* change text-align to center to center the header text */
  text-align: left;
  color: var(--header-text-color);
  padding: 5px;
}
.sheet-rolltemplate-custom .sheet-title {
  font-size:1.1em;
  font-weight: 600;
}
.sheet-rolltemplate-custom .sheet-subtitle {
  font-size:.9em;
}

/* example colors */
.sheet-rolltemplate-custom .sheet-container {
  /* this is the default color */
  --header-bg-color: rgba(112,32,130,1);
  --header-text-color: #FFF;
}
.sheet-rolltemplate-custom .sheet-container.sheet-color-red {
  --header-bg-color: #F00;
}

/* Allprops part */
.sheet-rolltemplate-custom .sheet-content {
  display: grid;
  background: #FFF;
  /* Header formatting - modify the column layout below */
  grid-template-columns: auto auto;
  /* Line height to match default roll template */
  line-height:1.4em;
}
.sheet-rolltemplate-custom .sheet-content > div {
  padding: 5px;
}

/* Left column */
.sheet-rolltemplate-custom .sheet-content .sheet-key {
  font-weight: bold;
  padding-right: 10px;
  text-align: right;
}

/* Empty rule, use this if you want to change the right column
.sheet-rolltemplate-custom .sheet-value {
}
*/

/* Make even-numbered rows grey */
.sheet-rolltemplate-custom .sheet-content :nth-child(4n+3),
.sheet-rolltemplate-custom .sheet-content :nth-child(4n) {
  background:#EEE;
}

/* Description field */
.sheet-rolltemplate-custom .sheet-desc {
  grid-column: span 2;
  padding: 5px;
  text-align: left;
}
"""
    rise_custom = """
.sheet-rolltemplate-custom .sheet-container.sheet-color-monster {
  --header-bg-color: #8B0000;
}
.sheet-rolltemplate-custom .sheet-container.sheet-color-black {
  --header-bg-color: #000000;
}
.sheet-rolltemplate-custom .sheet-container.sheet-color-blue {
  --header-bg-color: #00008B;
}
.sheet-rolltemplate-custom .sheet-container.sheet-color-bluegreen {
  --header-bg-color: #008B8B;
}
.sheet-rolltemplate-custom .sheet-container.sheet-color-brown {
  --header-bg-color: #65350F;
}
.sheet-rolltemplate-custom .sheet-container.sheet-color-gold {
  --header-bg-color: #B8860B;
}
.sheet-rolltemplate-custom .sheet-container.sheet-color-gray {
  --header-bg-color: #696969;
}
.sheet-rolltemplate-custom .sheet-container.sheet-color-green {
  --header-bg-color: #006400;
}
.sheet-rolltemplate-custom .sheet-container.sheet-color-orange {
  --header-bg-color: #CC5500;
}
.sheet-rolltemplate-custom .sheet-container.sheet-color-purple {
  --header-bg-color: #800080;
}
"""
    return jakob_default + rise_custom
