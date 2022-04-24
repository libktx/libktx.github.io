// WARNING: Made by a backend developer. Read at your own risk.

$(document).ready(function () {
    // Gradle/Maven dependencies:
    var mavenLibraryVersion = '${ktx.version}';
    var gradleLibraryVersion = 'ktxVersion';
    var gradleKotlinLibraryVersion = 'ktxVersion';
    var currentModule = 'ktx-actors';
    var dependencySchema;

    function getGradleDependency(module) {
        return "// " + module + ":\n" +
            "api group: 'io.github.libktx', name: '" + module + "', version: " + gradleLibraryVersion;
    }

    function getGradleKotlinDependency(module) {
        return "// " + module + ":\n" +
            'api(group = "io.github.libktx", name = "' + module + '", version = ' + gradleKotlinLibraryVersion + ')';
    }

    function getMavenDependency(module) {
        return "<!-- " + module + " -->\n" +
            "<dependency>\n" +
            "    <groupId>io.github.libktx</groupId>\n" +
            "    <artifactId>" + module + "</artifactId>\n" +
            "    <version>" + mavenLibraryVersion + "</version>\n" +
            "</dependency>";
    }

    $('#module-select').find('a').click(function () {
        currentModule = $(this).text();
        refreshDependencyDeclaration();
    });

    $('.module-link').click(function () {
        currentModule = $(this).data('module');
        refreshDependencyDeclaration();
    });

    $('#dependency-gradle').click(function () {
        setGradleDependencySchema();
        $(this).addClass('active');
        $('#dependency-maven').removeClass('active');
        $('#dependency-gradle-kotlin').removeClass('active');
        refreshDependencyDeclaration();
    });

    $('#dependency-gradle-kotlin').click(function () {
        setGradleKotlinDependencySchema();
        $(this).addClass('active');
        $('#dependency-maven').removeClass('active');
        $('#dependency-gradle').removeClass('active');
        refreshDependencyDeclaration();
    });

    $('#dependency-maven').click(function () {
        setMavenDependencySchema();
        $(this).addClass('active');
        $('#dependency-gradle').removeClass('active');
        $('#dependency-gradle-kotlin').removeClass('active');
        refreshDependencyDeclaration();
    });

    function setGradleDependencySchema() {
        dependencySchema = getGradleDependency;
        $('#dependency-code').removeClass('xml').removeClass('kotlin').addClass('groovy');
    }

    function setGradleKotlinDependencySchema() {
        dependencySchema = getGradleKotlinDependency;
        $('#dependency-code').removeClass('xml').removeClass('groovy').addClass('kotlin');
    }

    function setMavenDependencySchema() {
        dependencySchema = getMavenDependency;
        $('#dependency-code').removeClass('groovy').removeClass('kotlin').addClass('xml');
    }

    function refreshDependencyDeclaration() {
        var codeElement = $('#dependency-code');
        codeElement.text(dependencySchema(currentModule));
        hljs.highlightBlock(codeElement[0]);
    }

    setGradleDependencySchema();
    refreshDependencyDeclaration();

    // Fetching latest library version from the repository:
    $.ajax({
        type: 'GET',
        url: 'https://api.github.com/repos/libktx/ktx/contents/version.txt?ref=master',
        dataType: 'jsonp',
        async: true,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Access-Control-Allow-Headers', 'x-requested-with');
        },
        success: function (response) {
            var version = $.base64.decode(response.data.content.trim()).trim();
            if (/^\d+\.\d+\.\d+(-rc\d+)?$/.test(version)) {
                mavenLibraryVersion = version;
                gradleLibraryVersion = "'" + version + "'";
                gradleKotlinLibraryVersion = '"' + version + '"';
                refreshDependencyDeclaration();
            }
        }
    });

    // Smooth scrolling:
    $(".navbar a, footer a, .module-link").click(function (event) {
        if (this.hash !== '') {
            event.preventDefault();
            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 900, function () {
                window.location.hash = hash;
            });
        }
    });

    $(".scroll-top").click(function () {
        $("html, body").animate({scrollTop: 0}, 900);
    })
});
