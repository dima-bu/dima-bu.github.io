function save_bookmark(type, obj_id){
	$.ajax({
		url: '/profile/save-bookmark/'+type+'/'+obj_id+'/ajax/',
		type: 'GET',
		success: function(response) {
			if (type == 'news'){
				$('#id_news_bookmark_'+obj_id).html('<i class="fa fa-bookmark"></i> <span>Bookmarked</span>');
				$('#id_news_bookmark_'+obj_id).attr('onclick', 'javascript:remove_bookmark("news", "'+obj_id+'")');
			}else if (type == 'job'){
				$('#id_job_bookmark_'+obj_id).html('<i class="fa fa-bookmark"></i> <span>Bookmarked</span>');
				$('#id_job_bookmark_'+obj_id).attr('onclick', 'javascript:remove_bookmark("job", "'+obj_id+'")');
			}else if (type == 'conference'){
				$('#id_conference_bookmark_'+obj_id).html('<i class="fa fa-bookmark"></i> <span>Bookmarked</span>');
				$('#id_conference_bookmark_'+obj_id).attr('onclick', 'javascript:remove_bookmark("conference", "'+obj_id+'")');
			}else if (type == 'syndicate'){
				$('#id_syndicate_bookmark_'+obj_id).html('<i class="fa fa-bookmark"></i> <span>Bookmarked</span>');
				$('#id_syndicate_bookmark_'+obj_id).attr('onclick', 'javascript:remove_bookmark("syndicate", "'+obj_id+'")');
			}else if (type == 'announcement'){
				$('#id_announcement_bookmark_'+obj_id).html('<i class="fa fa-bookmark"></i> <span>Bookmarked</span>');
				$('#id_announcement_bookmark_'+obj_id).attr('onclick', 'javascript:remove_bookmark("announcement", "'+obj_id+'")');
			}else if (type == 'catalogue'){
				$('#id_catalogue_bookmark_'+obj_id).html('<i class="fa fa-bookmark"></i> <span>Bookmarked</span>');
				$('#id_catalogue_bookmark_'+obj_id).attr('onclick', 'javascript:remove_bookmark("catalogue", "'+obj_id+'")');
			}
		}
	});
}

function remove_bookmark(type, obj_id){
	$.ajax({
		url: '/profile/remove-bookmark/'+type+'/'+obj_id+'/ajax/',
		type: 'GET',
		success: function(response) {
			if (type == 'news'){
				$('#id_news_bookmark_'+obj_id).html('<i class="fa fa-bookmark-o"></i> <span>Bookmark</span>');
				$('#id_news_bookmark_'+obj_id).attr('onclick', 'javascript:save_bookmark("news", "'+obj_id+'")');
			}else if (type == 'job'){
				$('#id_job_bookmark_'+obj_id).html('<i class="fa fa-bookmark-o"></i> <span>Bookmark</span>');
				$('#id_job_bookmark_'+obj_id).attr('onclick', 'javascript:save_bookmark("job", "'+obj_id+'")');
			}else if (type == 'conference'){
				$('#id_conference_bookmark_'+obj_id).html('<i class="fa fa-bookmark-o"></i> <span>Bookmark</span>');
				$('#id_conference_bookmark_'+obj_id).attr('onclick', 'javascript:save_bookmark("conference", "'+obj_id+'")');
			}else if (type == 'syndicate'){
				$('#id_syndicate_bookmark_'+obj_id).html('<i class="fa fa-bookmark-o"></i> <span>Bookmark</span>');
				$('#id_syndicate_bookmark_'+obj_id).attr('onclick', 'javascript:save_bookmark("syndicate", "'+obj_id+'")');
			}else if (type == 'announcement'){
				$('#id_announcement_bookmark_'+obj_id).html('<i class="fa fa-bookmark-o"></i> <span>Bookmark</span>');
				$('#id_announcement_bookmark_'+obj_id).attr('onclick', 'javascript:save_bookmark("announcement", "'+obj_id+'")');
			}else if (type == 'catalogue'){
				$('#id_catalogue_bookmark_'+obj_id).html('<i class="fa fa-bookmark-o"></i> <span>Bookmark</span>');
				$('#id_catalogue_bookmark_'+obj_id).attr('onclick', 'javascript:save_bookmark("catalogue", "'+obj_id+'")');
			}
		}
	});
}