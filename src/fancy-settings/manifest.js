// SAMPLE
this.manifest = {
    "name": "wallabag",
    "icon": "../assets/48x48.png",
    "settings": [
        {
            "tab": i18n.get("wallabag configuration"),
            "group": i18n.get("Server information"),
            "name": "base_url",
            "type": "text",
            "label": i18n.get("Base URL"),
            "text": i18n.get("x-url")
        },
        {
            "tab": i18n.get("wallabag configuration"),
            "group": i18n.get("Credentials"),
            "name": "username",
            "type": "text",
            "label": i18n.get("Username"),
            "text": i18n.get("username")
        },
        {
            "tab": i18n.get("wallabag configuration"),
            "group": i18n.get("Credentials"),
            "name": "password",
            "type": "text",
            "label": i18n.get("Password"),
            "text": i18n.get("password")
        },
        {
            "tab": i18n.get("wallabag configuration"),
            "group": i18n.get("Server information"),
            "name": "myDescription",
            "type": "description",
            "text": i18n.get("description")
        },
    ],
    "alignment": [
        [
            "base_url"
        ]
    ]
};
