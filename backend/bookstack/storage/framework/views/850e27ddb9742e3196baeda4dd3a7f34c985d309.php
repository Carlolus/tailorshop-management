<?php $__env->startPush('social-meta'); ?>
    <meta property="og:description" content="<?php echo e(Str::limit($page->text, 100, '...')); ?>">
<?php $__env->stopPush(); ?>

<?php $__env->startSection('body'); ?>

    <div class="mb-m print-hidden">
        <?php echo $__env->make('entities.breadcrumbs', ['crumbs' => [
            $page->book,
            $page->hasChapter() ? $page->chapter : null,
            $page,
        ]], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
    </div>

    <main class="content-wrap card">
        <div class="page-content clearfix" page-display="<?php echo e($page->id); ?>">
            <?php echo $__env->make('pages.parts.pointer', ['page' => $page], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
            <?php echo $__env->make('pages.parts.page-display', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
        </div>
    </main>

    <?php echo $__env->make('entities.sibling-navigation', ['next' => $next, 'previous' => $previous], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>

    <?php if($commentsEnabled): ?>
        <?php if(($previous || $next)): ?>
            <div class="px-xl">
                <hr class="darker">
            </div>
        <?php endif; ?>

        <div class="px-xl comments-container mb-l print-hidden">
            <?php echo $__env->make('comments.comments', ['page' => $page], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
            <div class="clearfix"></div>
        </div>
    <?php endif; ?>
<?php $__env->stopSection(); ?>

<?php $__env->startSection('left'); ?>

    <?php if($page->tags->count() > 0): ?>
        <section>
            <?php echo $__env->make('entities.tag-list', ['entity' => $page], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
        </section>
    <?php endif; ?>

    <?php if($page->attachments->count() > 0): ?>
        <div id="page-attachments" class="mb-l">
            <h5><?php echo e(trans('entities.pages_attachments')); ?></h5>
            <div class="body">
                <?php echo $__env->make('attachments.list', ['attachments' => $page->attachments], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
            </div>
        </div>
    <?php endif; ?>

    <?php if(isset($pageNav) && count($pageNav)): ?>
        <nav id="page-navigation" class="mb-xl" aria-label="<?php echo e(trans('entities.pages_navigation')); ?>">
            <h5><?php echo e(trans('entities.pages_navigation')); ?></h5>
            <div class="body">
                <div class="sidebar-page-nav menu">
                    <?php $__currentLoopData = $pageNav; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $navItem): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                        <li class="page-nav-item h<?php echo e($navItem['level']); ?>">
                            <a href="<?php echo e($navItem['link']); ?>" class="text-limit-lines-1 block"><?php echo e($navItem['text']); ?></a>
                            <div class="primary-background sidebar-page-nav-bullet"></div>
                        </li>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                </div>
            </div>
        </nav>
    <?php endif; ?>

    <?php echo $__env->make('entities.book-tree', ['book' => $book, 'sidebarTree' => $sidebarTree], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
<?php $__env->stopSection(); ?>

<?php $__env->startSection('right'); ?>
    <div id="page-details" class="entity-details mb-xl">
        <h5><?php echo e(trans('common.details')); ?></h5>
        <div class="body text-small blended-links">
            <?php echo $__env->make('entities.meta', ['entity' => $page], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>

            <?php if($book->restricted): ?>
                <div class="active-restriction">
                    <?php if(userCan('restrictions-manage', $book)): ?>
                        <a href="<?php echo e($book->getUrl('/permissions')); ?>"><?php echo icon('lock'); ?><?php echo e(trans('entities.books_permissions_active')); ?></a>
                    <?php else: ?>
                        <?php echo icon('lock'); ?><?php echo e(trans('entities.books_permissions_active')); ?>

                    <?php endif; ?>
                </div>
            <?php endif; ?>

            <?php if($page->chapter && $page->chapter->restricted): ?>
                <div class="active-restriction">
                    <?php if(userCan('restrictions-manage', $page->chapter)): ?>
                        <a href="<?php echo e($page->chapter->getUrl('/permissions')); ?>"><?php echo icon('lock'); ?><?php echo e(trans('entities.chapters_permissions_active')); ?></a>
                    <?php else: ?>
                        <?php echo icon('lock'); ?><?php echo e(trans('entities.chapters_permissions_active')); ?>

                    <?php endif; ?>
                </div>
            <?php endif; ?>

            <?php if($page->restricted): ?>
                <div class="active-restriction">
                    <?php if(userCan('restrictions-manage', $page)): ?>
                        <a href="<?php echo e($page->getUrl('/permissions')); ?>"><?php echo icon('lock'); ?><?php echo e(trans('entities.pages_permissions_active')); ?></a>
                    <?php else: ?>
                        <?php echo icon('lock'); ?><?php echo e(trans('entities.pages_permissions_active')); ?>

                    <?php endif; ?>
                </div>
            <?php endif; ?>

            <?php if($page->template): ?>
                <div>
                    <?php echo icon('template'); ?><?php echo e(trans('entities.pages_is_template')); ?>

                </div>
            <?php endif; ?>
        </div>
    </div>

    <div class="actions mb-xl">
        <h5><?php echo e(trans('common.actions')); ?></h5>

        <div class="icon-list text-primary">

            
            <?php if(userCan('page-update', $page)): ?>
                <a href="<?php echo e($page->getUrl('/edit')); ?>" class="icon-list-item">
                    <span><?php echo icon('edit'); ?></span>
                    <span><?php echo e(trans('common.edit')); ?></span>
                </a>
            <?php endif; ?>
            <?php if(userCanOnAny('page-create')): ?>
                <a href="<?php echo e($page->getUrl('/copy')); ?>" class="icon-list-item">
                    <span><?php echo icon('copy'); ?></span>
                    <span><?php echo e(trans('common.copy')); ?></span>
                </a>
            <?php endif; ?>
            <?php if(userCan('page-update', $page)): ?>
                <?php if(userCan('page-delete', $page)): ?>
	                <a href="<?php echo e($page->getUrl('/move')); ?>" class="icon-list-item">
	                    <span><?php echo icon('folder'); ?></span>
	                    <span><?php echo e(trans('common.move')); ?></span>
	                </a>
                <?php endif; ?>
                <a href="<?php echo e($page->getUrl('/revisions')); ?>" class="icon-list-item">
                    <span><?php echo icon('history'); ?></span>
                    <span><?php echo e(trans('entities.revisions')); ?></span>
                </a>
            <?php endif; ?>
            <?php if(userCan('restrictions-manage', $page)): ?>
                <a href="<?php echo e($page->getUrl('/permissions')); ?>" class="icon-list-item">
                    <span><?php echo icon('lock'); ?></span>
                    <span><?php echo e(trans('entities.permissions')); ?></span>
                </a>
            <?php endif; ?>
            <?php if(userCan('page-delete', $page)): ?>
                <a href="<?php echo e($page->getUrl('/delete')); ?>" class="icon-list-item">
                    <span><?php echo icon('delete'); ?></span>
                    <span><?php echo e(trans('common.delete')); ?></span>
                </a>
            <?php endif; ?>

            <hr class="primary-background"/>

            <?php if(signedInUser()): ?>
                <?php echo $__env->make('entities.favourite-action', ['entity' => $page], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
            <?php endif; ?>
            <?php if(userCan('content-export')): ?>
                <?php echo $__env->make('entities.export-menu', ['entity' => $page], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
            <?php endif; ?>
        </div>

    </div>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.tri', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH /var/www/bookstack/resources/views/pages/show.blade.php ENDPATH**/ ?>