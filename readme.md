Railway Bootstrap Plugin
========================
[Railway Bootstrap](https://github.com/mhuggins/railway-bootstrap) is a
[RailwayJS](http://railwayjs.com/) plugin that will render forms for your models
utilizing [Twitter Bootstrap](http://twitter.github.com/bootstrap/) formatting
and CSS classes.

Requirements:
-------------
Railway Bootstrap requires [RailwayJS](https://github.com/1602/express-on-railway)
v2.6+.  The plugin may work with earlier version of RailwayJS, but is untested.

Additionally, RailwayJS uses [EJS](https://github.com/visionmedia/ejs) for
rendering view templates by default.  While RailwayJS is capable of working with
the [Jade](http://jade-lang.com/) rendering engine, Railway Bootstrap has not yet
been tested with Jade.

Installation:
-------------
Install the package via npm:

    > npm install railway-bootstrap

The Railway-Bootstrap plugin still needs to be initialized in your RailwayJS app.
In the root folder of your app, open (or create if it doesn't exist) `npmfile.js`,
and paste the following code:

    require('railway-bootstrap');

Usage:
------
Assume that your application has a `User` model with properties `username`,
`email`, `avatar`, and `description` in the following example.  Also assume that
`user` is an instance of the `User` model (generated via `new User()`).

    <% bootstrapFormFor(user, function (form) { %>
        <%- form.input('username') %>
        <%- form.input('email', { label: 'Email Address' }) %>
        <%- form.file('avatar') %>
        <%- form.textarea('description') %>
    <% }) %>

The `bootstrapFormFor` helper method has two valid signatures:

1. `bootstrapFormFor(resource, callback)`
2. `bootstrapFormFor(resource, options, callback)`

The parameters are defined as follows:

* `resource`: An instance of a model that the form will represent.
* `options`: A simple object that includes any extra attributes you wish to
  define on the form, in addition to a `type` option that is explained in
  more detail below.
* `callback`: A function that is used for defining fields within the form.

Below is a simple example of how you might use this helper method.

    bootstrapFormFor(user, { action: '/users/new', method: 'put' }, function (form) { ... });

This example produces HTML like the following:

    <form class="well" action="/users/new" method="post">
        <input type="hidden" name="authenticity_token" value="f46d9de27e45fef8dce10a36dcdc7be7fa8612af" />
        <input type="hidden" name="_method" value="PUT" />
        <!-- any other calls made on the form object will render here -->
    </form>

When using `bootstrapFormFor`, the `callback` parameter will be provided with a
`form` object as the only parameter.  This object provides several methods that
can be used for rendering form fields.

* `input (name, options)`: Creates an `<input>` element, where `name` is the name of
  the resource's property to render.  If no `options` are provided, the input type
  defaults to "text".
* `textarea (name, options)`: Creates a `<textarea>` element, where `name` is the
  name of the resource's property to render.
* `file (name, options)`: Creates an `<input type="file">` element, where `name`
  is the name of the resource's property to render.
* `submit (label, options)`: Creates a `<button type="submit">` element, where
  `label` is the text to be rendered on the button.

Form Types
----------
This plugin implements three of the Twitter Bootstraps form types: vertical
(the default), horizontal, and inline.  There are two ways to change the type
of form being rendered.  The first is to use the `type` option when calling
`bootstrapFormFor`.

    bootstrapFormFor(user, { type: 'horizontal' }, function (form) { ... });

Additionally, there are helper methods provided for each of the types of forms
implemented.

    horizontalFormFor(user, function (form) { ... });
    verticalFormFor(user, function (form) { ... });
    inlineFormFor(user, function (form) { ... });

Refer to the [Forms section of the Twitter Bootstrap docs](http://twitter.github.com/bootstrap/base-css.html#forms)
for more details on and examples of form types.

Created By:
-----------
[Matt Huggins](http://www.matthuggins.com)

License:
--------
Railway Bootstrap is released under the [MIT license](http://www.opensource.org/licenses/MIT).