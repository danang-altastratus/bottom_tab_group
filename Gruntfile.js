// titanium build targets,
var ti_args= {
  ipodaudiclub: ['-p', 'ios', '-T', 'device', '-P', "'38ae637b-40cf-4ec7-835f-bde622f92aa2'", '-V', "'Danang Iswadi (9CMXJ623S3)'"],
  ipodmiles: ['-p', 'ios', '-T', 'device', '-P', "'3e1bc556-18b8-413d-ac87-0990ba0ab572'", '-V', "'Danang Iswadi (86A29X5336)'", '--liveview'],  
  ipad: ['-p','ios','-T', 'simulator', '--device-id','868C1666-8B60-4158-BEB8-AA49A92E4095', '--liveview'],
  iphone6plus: ['-p','ios','-T', 'simulator', '--device-id','D7108BF5-8ABD-4456-9ED0-B4684122DB9C', '--liveview'],
  iphone6: ['-p','ios','-T', 'simulator', '--device-id','8A2AB89D-EEFC-4D74-A1E8-E045CC7B28C6', '--liveview'],
  iphone5: ['-p','ios','-T', 'simulator', '--device-id','72540C21-8C14-41E6-A1C4-251AE6FC4068', '--liveview'],  
  androidDevice: ['-p','android', '-T','device'],
  androidTablet: ['-p','android','-T', 'simulator', '--device-id','Google Nexus 7 - 5.1.0 - API 22 - 800x1280', '--liveview'],
  nexus6: ['-p','android','-T', 'emulator', '--device-id',"'Google Nexus 6 - 5.1.0 - API 22 - 1440x2560'", '--liveview'],
  nexus5: ['-p','android','-T', 'emulator', '--device-id',"'Google Nexus 5 - 6.0.0 - API 23 - 1080x1920'", '--liveview'],
  nexus4: ['-p','android','-T', 'emulator', '--device-id',"'Google Nexus 4 - 4.4.4 - API 19 - 768x1280'", '--liveview'],
  nexusS: ['-p','android','-T', 'emulator', '--device-id',"'Google Nexus S - 4.1.1 - API 16 - 480x800'", '--liveview'],  
  default: ['-p','ios']
};

module.exports = function(grunt) {
  grunt.initConfig({

    // Project Specific Definitions
    ios_family: "universal",
    ios_adhoc_name: "Danang Iswadi",
    ios_adhoc_profile: "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
    ios_appstore_name:"Altastratus",
    ios_appstore_profile:"XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
    android_keystore: "./android.keystore",
    android_keypass: "changeit",

    // Task Configuration
    babel : {
      options: {
        sourceMap: false,
        presets: ['es2015']
      },
      dist: {
        files: [{
          expand: true,
          src: ['**/*.js'],        
          cwd: 'src',
          ext: '.js'
        }]
      }
    },
    jscs: {
      compile: {
        src: "app/**/*.js",
        options: {
          reporter: 'node_modules/jscs-html-reporter/jscs-html-reporter.js',
          reporterOutput: 'reports/jscs.html',
          config: false,
          force: true,
          requireCurlyBraces: ['if', 'else', 'for', 'while', 'do', 'try', 'catch'],
          requireSpaceAfterKeywords: ['if', 'else', 'for', 'while', 'do', 'switch', 'return', 'try', 'catch'],
          requireSpaceBeforeBinaryOperators: ['?', '+', '-', '/', '*', '=', '==', '===', '!=', '!==', '>', '>=', '<', '<='],
          requireSpaceAfterBinaryOperators: ['?', '+', '/', '*', ':', '=', '==', '===', '!=', '!==', '>', '>=', '<', '<='],
          requireCommaBeforeLineBreak: true,
          requireBlocksOnNewline: true,
          requireLineBreakAfterVariableAssignment: true,
          requireCamelCaseOrUpperCaseIdentifiers: true,
          requireParenthesesAroundIIFE: true,
          requireSpacesInConditionalExpression: true,
          requireSpacesInFunctionDeclaration: {
            beforeOpeningCurlyBrace: true
          },
          requireSpacesInFunctionExpression: {
            beforeOpeningCurlyBrace: true
          },
          requireMultipleVarDecl: 'onevar',
          disallowTrailingComma: true,
          disallowSpaceAfterBinaryOperators: ['!'],
          disallowSpaceBeforeBinaryOperators: [','],
          disallowEmptyBlocks: true,
          disallowKeywords: ['with'],
          disallowMultipleLineBreaks: true,
          disallowMultipleLineStrings: true,
          disallowMixedSpacesAndTabs: true,
          disallowKeywordsOnNewLine: ['else'],
          disallowNewlineBeforeBlockStatements: true,
          disallowPaddingNewlinesInBlocks: true,
          validateIndentation: '\t'
        }    
      }      
    },            
    
    // titanium-cli commands in absence of a plugin
    shell: {
      options: {
        stdout: true,
        stderr: true
      },
      appify: {
        command: ['appc','ti', 'build'].concat(ti_args[grunt.option("p")||'default']).concat("--appify").join(" ")
      },
      adhoc: {
        command: 'appc ti build -p ios -F <%= ios_family %> -T dist-adhoc -R "<%= ios_adhoc_name %>" -P" <%= ios_adhoc_profile %>"  -O ~/Desktop '
      },
      appstore: {
        command: 'appc ti build -p ios -F <%= ios_family %> -T dist-appstore -R "<%= ios_appstore_name %>" -P" <%= ios_apptore_profile %>"  -O ~/Desktop '
      },
      playstore: {
        command: 'appc ti build -T dist-playstore -O ~/Desktop -p android -K <%= android_keystore %> - P <%= android_keypass %>'
      }      
    },   
    concurrent: {
      options: {
        logConcurrentOutput: true,
      },
      run: {
        tasks: ['shell:appify']
      },
      spec: {
        tasks: ['shell:appify']
      }
    },    
    clean: {
      project: {
        src: ['Resources/', 'build/', 'reports/']
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.loadNpmTasks('grunt-jscs');

  grunt.registerTask('default', ['build', 'jscs']);  
  grunt.registerTask('build', ['babel']);
  grunt.registerTask('install', ['build','concurrent:run']);  

  //titanium cli tasks
  ['appify', 'appstore','adhoc','playstore'].forEach(function(target) {
    grunt.registerTask(target, ['build','shell:'+target]);
  });
};