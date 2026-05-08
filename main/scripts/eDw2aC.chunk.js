// Fetch and display news posts
fetch('data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Loaded data:', data);
        
        // Get the latest post ID
        const latestPostId = data.latest_post;  // This gives "post_1"
        
        // Get the actual post content
        const latestPost = data[latestPostId];
        
        // Get the lines array from the post
        const lines = latestPost.contents.lines;
        
        // Create HTML output
        let html = '<div class="news-container">';
        
        // Convert markdown-style headers and regular text to HTML
        lines.forEach(line => {
            if (line.startsWith('## ')) {
                // This is an h2 header
                html += `<h2>${line.substring(3)}</h2>`;
            } else if (line.startsWith('# ')) {
                // This is an h1 header (in case you add one)
                html += `<h1>${line.substring(2)}</h1>`;
            } else {
                // Regular paragraph
                html += `<p>${line}</p>`;
            }
        });
        
        html += '</div>';
        
        // Display on page
        document.getElementById('content').innerHTML = html;
    })
    .catch(error => {
        console.error('Error loading JSON:', error);
        document.getElementById('content').innerHTML = 
            '<p style="color:red">Failed to load news data. Please try again later.</p>';
    });
